import { useState } from 'react';
import './App.css';
import { CategoryTabs } from './components/CategoryTabs';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';

function App() {
  const [activeCategory, setActiveCategory] = useState<'Personal' | 'Professional'>('Personal');
  const { tasks, addTask, updateTask, deleteTask, clearCompleted } = useTasks();

  // Count tasks per category
  const personalCount = tasks.filter((t) => t.category === 'Personal').length;
  const professionalCount = tasks.filter((t) => t.category === 'Professional').length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo Application</h1>
      </header>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        personalCount={personalCount}
        professionalCount={professionalCount}
      />

      <TaskInput onAddTask={addTask} activeCategory={activeCategory} />

      <TaskList
        tasks={tasks}
        category={activeCategory}
        onToggleComplete={updateTask}
        onDelete={deleteTask}
        onClearCompleted={() => clearCompleted(activeCategory)}
      />
    </div>
  );
}

export default App;
