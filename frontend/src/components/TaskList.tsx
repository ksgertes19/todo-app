import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  category: 'Personal' | 'Professional';
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  category,
  onToggleComplete,
  onDelete,
  onClearCompleted,
}) => {
  const filteredTasks = tasks.filter((task) => task.category === category);
  const completedCount = filteredTasks.filter((task) => task.completed).length;

  if (filteredTasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
      {completedCount > 0 && (
        <button className="clear-completed-button" onClick={onClearCompleted}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
          </svg>
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  );
};
