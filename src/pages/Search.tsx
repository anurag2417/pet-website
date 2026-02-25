// src/pages/Search.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPets, getAllCategories } from '../data/petData';
import type { Pet } from '../data/petData';
import SearchBar from '../components/SearchBar';

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

  if (!query) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 className="section-title">Search Pets</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          Enter a search term to find pet care guides
        </p>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SearchBar autoFocus />
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="section-title">Search Results</h1>
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
          <SearchBar />
        </div>
      </div>

      {/* Results Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} 
            {results.length !== filteredResults.length && 
              ` (filtered from ${results.length} total)`}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {query && `Search term: "${query}"`}
          </p>
        </div>
        
        {/* Active Filters */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || sortBy !== 'relevance') && (
          <button
            onClick={clearFilters}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--accent-green)',
              color: 'var(--accent-green)',
              borderRadius: '5px',
              cursor: 'pointer'
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
        padding: '1rem',
        backgroundColor: 'var(--secondary-dark)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '5px'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
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
            fontSize: '0.9rem'
          }}>
            Care Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '5px'
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
            fontSize: '0.9rem'
          }}>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '5px'
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
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h2 style={{ marginBottom: '1rem' }}>No pets found</h2>
          <p style={{ 
            marginBottom: '2rem', 
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            We couldn't find any pets matching "{query}". Try searching with different keywords.
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
                  alignItems: 'start',
                  marginBottom: '0.5rem'
                }}>
                  <h3 className="category-title">{pet.name}</h3>
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
                  marginTop: '1rem'
                }}>
                  <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                  }}>
                    {pet.categoryName}
                  </span>
                  <span className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
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