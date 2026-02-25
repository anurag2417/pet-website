// src/components/CategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    path?: string; // Make path optional
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Use the path if provided, otherwise construct from id
  const linkTo = category.path || `/category/${category.id}`;
  
  return (
    <Link to={linkTo} className="category-card">
      <img src={category.image} alt={category.name} className="category-image" />
      <div className="category-content">
        <h3 className="category-title">{category.name}</h3>
        <p className="category-description">{category.description}</p>
        <span className="btn btn-secondary">Explore {category.name} →</span>
      </div>
    </Link>
  );
};

export default CategoryCard;