// components/CategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    path: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={category.path} className="category-card">
      <img src={category.image} alt={category.name} className="category-image" />
      <div className="category-content">
        <h3 className="category-title">{category.name}</h3>
        <p className="category-description">{category.description}</p>
        <span className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          Explore {category.name} →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;