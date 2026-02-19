import { useState, useEffect, useCallback, useRef } from 'react';
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
  clearCompleted: (category: 'Personal' | 'Professional') => void;
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
  const tasksRef = useRef(tasks);

  // Keep ref in sync with tasks
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

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

  // Load tasks on component mount (only once)
  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const updatedTasks = [...tasksRef.current, newTask];
      setTasks(updatedTasks);
      setError(null);

      // Sync with API (fire and forget)
      taskApi
        .createTask({ description, category })
        .catch((err) => {
          console.error('Failed to save task to API:', err);
          // Task is still in localStorage as fallback
        });
    },
    [setTasks],
  );

  // Update task (toggle completion)
  const updateTask = useCallback(
    (id: string, completed: boolean) => {
      const updatedTasks = tasksRef.current.map((task) =>
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

      // Sync with API (fire and forget)
      taskApi.updateTask(id, { completed }).catch((err) => {
        console.error('Failed to update task on API:', err);
      });
    },
    [setTasks],
  );

  // Delete task
  const deleteTask = useCallback(
    (id: string) => {
      const updatedTasks = tasksRef.current.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setError(null);

      // Sync with API (fire and forget)
      taskApi.deleteTask(id).catch((err) => {
        console.error('Failed to delete task from API:', err);
      });
    },
    [setTasks],
  );

  // Clear completed tasks in specified category
  const clearCompleted = useCallback(
    (category: 'Personal' | 'Professional') => {
      // Get completed tasks in the specified category
      const completedIds = tasksRef.current
        .filter((task) => task.category === category && task.completed)
        .map((task) => task.id);

      // Filter out completed tasks in the specified category, keep all others
      const updatedTasks = tasksRef.current.filter(
        (task) => !(task.category === category && task.completed),
      );
      setTasks(updatedTasks);

      // Delete completed tasks from API
      completedIds.forEach((id) => {
        taskApi.deleteTask(id).catch((err) => {
          console.error('Failed to delete task from API:', err);
        });
      });
    },
    [setTasks],
  );

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