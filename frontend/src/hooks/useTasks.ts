import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';
import { taskApi } from '../services/api';
import { useLocalStorage } from './useLocalStorage';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (description: string, category: 'Personal' | 'Professional') => void;
  updateTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
  loadTasks: () => void;
}

/**
 * Main hook for task management
 * Handles CRUD operations with localStorage fallback
 */
export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from API on mount
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      console.warn('Failed to sync with API, using localStorage:', err);
      // Keep existing localStorage data as fallback
    } finally {
      setLoading(false);
    }
  }, [setTasks]);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Add new task
  const addTask = useCallback(
    (description: string, category: 'Personal' | 'Professional') => {
      if (!description.trim()) {
        setError('Description cannot be empty');
        return;
      }

      const newTask: Task = {
        id: Date.now().toString(),
        description,
        category,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Optimistic update to localStorage
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setError(null);

      // Sync with API
      taskApi
        .createTask({ description, category })
        .catch((err) => {
          console.error('Failed to save task to API:', err);
          // Task is still in localStorage as fallback
        });
    },
    [tasks, setTasks],
  );

  // Update task (toggle completion)
  const updateTask = useCallback(
    (id: string, completed: boolean) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      );

      setTasks(updatedTasks);
      setError(null);

      // Sync with API
      taskApi.updateTask(id, { completed }).catch((err) => {
        console.error('Failed to update task on API:', err);
      });
    },
    [tasks, setTasks],
  );

  // Delete task
  const deleteTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setError(null);

      // Sync with API
      taskApi.deleteTask(id).catch((err) => {
        console.error('Failed to delete task from API:', err);
      });
    },
    [tasks, setTasks],
  );

  // Clear completed tasks
  const clearCompleted = useCallback(() => {
    const completedIds = tasks
      .filter((task) => task.completed)
      .map((task) => task.id);

    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);

    // Delete completed tasks from API
    completedIds.forEach((id) => {
      taskApi.deleteTask(id).catch((err) => {
        console.error('Failed to delete task from API:', err);
      });
    });
  }, [tasks, setTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    clearCompleted,
    loadTasks,
  };
}