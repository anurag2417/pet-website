// pages/Categories.tsx
import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';

const Categories = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Pet Categories</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Browse all pet types to find detailed care guides and information
      </p>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;