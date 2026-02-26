// src/pages/Search.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPets, getAllCategories } from '../data/petData';
import type { Pet } from '../data/petData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Pet[]>([]);
  const [filteredResults, setFilteredResults] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const categories = getAllCategories();

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const searchResults = searchPets(query);
        setResults(searchResults);
        setFilteredResults(searchResults);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...results];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pet => pet.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(pet => pet.difficulty === selectedDifficulty);
    }

    // Sort results
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Moderate': 2, 'Expert': 3 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      default: // relevance - keep original order
        break;
    }

    setFilteredResults(filtered);
  }, [results, selectedCategory, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('relevance');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get('search') as string;
    if (newQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(newQuery)}`;
    }
  };

  if (!query) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 className="section-title">Search Pets</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          Enter a search term to find pet care guides
        </p>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              name="search"
              placeholder="Search for any pet..."
              className="search-input"
              autoFocus
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Header with Search */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--charcoal) 100%)',
        borderRadius: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Search Results</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              name="search"
              defaultValue={query}
              placeholder="Search for any pet..."
              className="search-input"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '15px',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Search term: <strong>"{query}"</strong>
            {results.length !== filteredResults.length && 
              ` (filtered from ${results.length} total)`}
          </p>
        </div>
        
        {/* Active Filters */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || sortBy !== 'relevance') && (
          <button
            onClick={clearFilters}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: '2px solid var(--accent-green)',
              color: 'var(--accent-green)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-green)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--accent-green)';
            }}
          >
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--secondary-dark)',
        borderRadius: '15px',
        border: '1px solid var(--border-color)'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '2px solid var(--border-color)',
              borderRadius: '10px',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Care Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '2px solid var(--border-color)',
              borderRadius: '10px',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '2px solid var(--border-color)',
              borderRadius: '10px',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <option value="relevance">Relevance</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="difficulty">Care Difficulty</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'var(--text-muted)' }}>Searching for pets...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredResults.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>No pets found</h2>
          <p style={{ 
            marginBottom: '2rem', 
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto 2rem',
            fontSize: '1.1rem'
          }}>
            We couldn't find any pets matching <strong>"{query}"</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
            <Link to="/categories" className="btn btn-secondary">
              Browse All Categories
            </Link>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!loading && filteredResults.length > 0 && (
        <div className="category-grid">
          {filteredResults.map((pet) => (
            <Link
              key={pet.id}
              to={`/pet/${pet.category}/${pet.id}`}
              className="category-card"
            >
              <img src={pet.image} alt={pet.name} className="category-image" />
              <div className="category-content">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <h3 className="category-title" style={{ marginBottom: 0 }}>{pet.name}</h3>
                  <span className={`difficulty-badge difficulty-${pet.difficulty.toLowerCase()}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {pet.difficulty}
                  </span>
                </div>
                <p className="category-description">{pet.summary}</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <span style={{
                    color: 'var(--accent-green)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    backgroundColor: 'var(--secondary-dark)',
                    padding: '0.3rem 1rem',
                    borderRadius: '20px'
                  }}>
                    {pet.categoryName}
                  </span>
                  <span className="btn btn-secondary" style={{ 
                    padding: '0.5rem 1.2rem',
                    fontSize: '0.9rem'
                  }}>
                    View Profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;