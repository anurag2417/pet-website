// src/pages/Categories.tsx
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';

const Categories = () => {
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="section-title">All Pet Categories</h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'var(--text-secondary)', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 3rem'
      }}>
        Explore our comprehensive guides for every type of pet, from common companions to exotic friends
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