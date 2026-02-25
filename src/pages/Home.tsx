// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';

const Home = () => {
  const navigate = useNavigate();
  
  // Only show first 4 categories on homepage
  const homepageCategories = categories.slice(0, 4);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to PetPedia</h1>
          <p>Your comprehensive guide to pet care and animal knowledge</p>
          
          {/* Search Form - Now matches the design */}
          <form onSubmit={handleSearch} className="search-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <input
              type="text"
              name="search"
              placeholder="Search for any pet (e.g., 'French Bulldog', 'Betta Fish')"
              className="search-input"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '50px',
                backgroundColor: 'white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            />
            <button 
              type="submit" 
              className="search-button"
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '0.8rem 2rem',
                backgroundColor: 'var(--dark-gray)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Popular Categories Section */}
      <div className="container home-categories">
        <h2 className="section-title">Popular Categories</h2>
        <div className="category-grid">
          {homepageCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;