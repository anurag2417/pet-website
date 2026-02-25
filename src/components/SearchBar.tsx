// src/components/SearchBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPets } from '../data/petData';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for any pet...", 
  autoFocus = false,
  onSearch 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Click outside to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Get suggestions as user types
    if (query.length >= 2) {
      const results = searchPets(query);
      setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleSuggestionClick = (pet: any) => {
    setQuery(pet.name);
    setShowSuggestions(false);
    navigate(`/pet/${pet.category}/${pet.id}`);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSearch} className="search-container">
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            autoFocus={autoFocus}
            style={{
              paddingRight: query ? '60px' : '40px'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '70px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '5px'
              }}
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="search-button"
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '0.5rem 1.5rem'
            }}
          >
            🔍
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          marginTop: '5px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {suggestions.map((pet) => (
            <div
              key={pet.id}
              onClick={() => handleSuggestionClick(pet)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                borderBottom: `1px solid var(--border-color)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <img
                src={pet.image}
                alt={pet.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '5px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '600', 
                  color: 'var(--text-primary)'
                }}>
                  {pet.name}
                </div>
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--text-muted)'
                }}>
                  {pet.categoryName} • {pet.difficulty} care
                </div>
              </div>
              <span style={{ color: 'var(--accent-green)' }}>→</span>
            </div>
          ))}
          
          {/* View all results option */}
          <div
            onClick={() => {
              setShowSuggestions(false);
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }}
            style={{
              padding: '0.75rem',
              textAlign: 'center',
              backgroundColor: 'var(--secondary-dark)',
              color: 'var(--accent-green)',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--secondary-dark)';
            }}
          >
            View all {suggestions.length} results →
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;