import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (description: string, category: 'Personal' | 'Professional') => void;
  activeCategory: 'Personal' | 'Professional';
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, activeCategory }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAddTask(description, activeCategory);
      setDescription('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="add-button" disabled={description.trim() === ''}>
        ADD
      </button>
    </form>
  );
};
