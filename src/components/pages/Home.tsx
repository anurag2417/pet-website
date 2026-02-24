// pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/categories';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Welcome to PetPedia</h1>
          <p>Your comprehensive guide to pet care and animal knowledge</p>
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              placeholder="Search for any pet (e.g., 'French Bulldog', 'Betta Fish')"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </section>

      <div className="container">
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Popular Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;