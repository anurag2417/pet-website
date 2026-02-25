// src/pages/Search.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPets } from '../data/petData';
import type { Pet } from '../data/petData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Pet[]>([]);

  useEffect(() => {
    if (query) {
      const searchResults = searchPets(query);
      setResults(searchResults);
    }
  }, [query]);

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="section-title">Search Results</h1>
      <p style={{ marginBottom: '2rem' }}>
        Found {results.length} results for "{query}"
      </p>
      
      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No pets found matching your search.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="category-grid">
          {results.map((pet) => (
            <Link
              key={pet.id}
              to={`/pet/${pet.category}/${pet.id}`}
              className="category-card"
            >
              <img src={pet.image} alt={pet.name} className="category-image" />
              <div className="category-content">
                <h3 className="category-title">{pet.name}</h3>
                <p className="category-description">{pet.summary}</p>
                <span className="btn btn-secondary">View Profile →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;