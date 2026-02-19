import React from 'react';

interface CategoryTabsProps {
  activeCategory: 'Personal' | 'Professional';
  onCategoryChange: (category: 'Personal' | 'Professional') => void;
  personalCount: number;
  professionalCount: number;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
  personalCount,
  professionalCount,
}) => {
  return (
    <div className="category-tabs">
      <button
        className={`tab ${activeCategory === 'Personal' ? 'active' : ''}`}
        onClick={() => onCategoryChange('Personal')}
      >
        Personal <span className="count">{personalCount}</span>
      </button>
      <button
        className={`tab ${activeCategory === 'Professional' ? 'active' : ''}`}
        onClick={() => onCategoryChange('Professional')}
      >
        Professional <span className="count">{professionalCount}</span>
      </button>
    </div>
  );
};
