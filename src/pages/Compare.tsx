// src/pages/Compare.tsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { pets, searchPets } from '../data/petData';
import type { Pet } from '../data/petData';

const Compare = () => {
    const [searchParams] = useSearchParams();
    const [selectedPets, setSelectedPets] = useState<Pet[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Pet[]>([]);
    const [showSearch, setShowSearch] = useState(false);

    // Load pets from URL params on initial load
    useEffect(() => {
        const petIds = searchParams.get('pets')?.split(',') || [];
        if (petIds.length > 0) {
            const petsToCompare = pets.filter(pet => petIds.includes(pet.id));
            setSelectedPets(petsToCompare.slice(0, 3));
        }
    }, [searchParams]);

    // Handle search
    useEffect(() => {
        if (searchQuery.length >= 2) {
            const results = searchPets(searchQuery);
            // Filter out already selected pets
            const filteredResults = results.filter(
                pet => !selectedPets.some(selected => selected.id === pet.id)
            );
            setSearchResults(filteredResults.slice(0, 5));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, selectedPets]);

    const addPet = (pet: Pet) => {
        if (selectedPets.length < 3 && !selectedPets.some(p => p.id === pet.id)) {
            setSelectedPets([...selectedPets, pet]);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    const removePet = (petId: string) => {
        setSelectedPets(selectedPets.filter(p => p.id !== petId));
    };

    const clearAll = () => {
        setSelectedPets([]);
    };

    const updateUrl = () => {
        const petIds = selectedPets.map(p => p.id).join(',');
        window.history.replaceState(null, '', `/compare?pets=${petIds}`);
    };

    useEffect(() => {
        updateUrl();
    }, [selectedPets]);

    const getComparisonRows = () => {
        const rows = [
            { label: 'Category', key: 'categoryName' },
            { label: 'Lifespan', key: 'lifespan' },
            { label: 'Adult Size', key: 'size' },
            { label: 'Temperament', key: 'temperament' },
            { label: 'Care Difficulty', key: 'difficulty', type: 'badge' },
            { label: 'Habitat', key: 'habitat', type: 'list' },
            { label: 'Diet', key: 'diet', type: 'list' },
            { label: 'Health Considerations', key: 'health', type: 'list' },
            { label: 'Behavior', key: 'behavior', type: 'list' },
            { label: 'Fun Facts', key: 'funFacts', type: 'list' },
        ];
        return rows;
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--charcoal) 100%)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)'
            }}>
                <h1 className="section-title" style={{ marginBottom: '1rem' }}>
                    Pet Comparison Tool
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    fontSize: '1.1rem'
                }}>
                    Compare up to 3 pets side by side to find the perfect companion for your lifestyle
                </p>
            </div>

            {/* Pet Selection Area */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.max(selectedPets.length, 1)}, 1fr) ${selectedPets.length < 3 ? 'auto' : ''}`,
                gap: '1.5rem',
                marginBottom: '3rem',
                minHeight: '300px'
            }}>
                {/* Selected Pet Cards */}
                {selectedPets.map(pet => (
                    <div
                        key={pet.id}
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: '15px',
                            border: '2px solid var(--accent-green)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={() => removePet(pet.id)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(220, 53, 69, 0.9)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#dc3545';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            ✕
                        </button>
                        <img
                            src={pet.image}
                            alt={pet.name}
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                {pet.name}
                            </h3>
                            <span className={`difficulty-badge difficulty-${pet.difficulty.toLowerCase()}`}>
                                {pet.difficulty}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Empty Slots */}
                {selectedPets.length < 3 && (
                    <>
                        {[...Array(3 - selectedPets.length)].map((_, index) => (
                            <div
                                key={`empty-${index}`}
                                onClick={() => {
                                    setShowSearch(true);
                                }}
                                style={{
                                    backgroundColor: 'var(--secondary-dark)',
                                    borderRadius: '15px',
                                    border: '2px dashed var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '2rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    minHeight: '300px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--secondary-dark)';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                }}
                            >
                                <span style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                    ➕
                                </span>
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                                    Click to add a pet
                                </p>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Search Modal */}
            {showSearch && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    backdropFilter: 'blur(5px)'
                }}
                    onClick={() => {
                        setShowSearch(false);
                        setSearchQuery('');
                        setSearchResults([]);
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: '20px',
                            padding: '2rem',
                            maxWidth: '500px',
                            width: '90%',
                            maxHeight: '80vh',
                            overflow: 'auto',
                            border: '1px solid var(--border-color)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                            Select a Pet to Compare
                        </h2>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for a pet..."
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: 'var(--secondary-dark)',
                                border: '2px solid var(--border-color)',
                                borderRadius: '10px',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                marginBottom: '1.5rem'
                            }}
                        />

                        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                            {searchResults.length === 0 && searchQuery.length >= 2 && (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                                    No pets found
                                </p>
                            )}

                            {searchResults.map(pet => (
                                <div
                                    key={pet.id}
                                    onClick={() => addPet(pet)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderBottom: '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
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
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '10px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                            {pet.name}
                                        </h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            {pet.categoryName} • {pet.difficulty} care
                                        </p>
                                    </div>
                                    <span style={{ color: 'var(--accent-green)' }}>Add +</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                                setSearchResults([]);
                            }}
                            className="btn btn-secondary"
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Comparison Table */}
            {selectedPets.length >= 2 && (
                <div style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    marginTop: '2rem'
                }}>
                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `200px repeat(${selectedPets.length}, 1fr)`,
                        backgroundColor: 'var(--secondary-dark)',
                        borderBottom: '2px solid var(--accent-green)'
                    }}>
                        <div style={{ padding: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                            Feature
                        </div>
                        {selectedPets.map(pet => (
                            <div key={pet.id} style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <Link
                                    to={`/pet/${pet.category}/${pet.id}`}
                                    style={{
                                        color: 'var(--accent-green)',
                                        textDecoration: 'none',
                                        fontWeight: '600'
                                    }}
                                >
                                    {pet.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Table Rows */}
                    {getComparisonRows().map((row, index) => (
                        <div
                            key={row.key}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `200px repeat(${selectedPets.length}, 1fr)`,
                                borderBottom: '1px solid var(--border-color)',
                                backgroundColor: index % 2 === 0 ? 'var(--card-bg)' : 'var(--secondary-dark)'
                            }}
                        >
                            <div style={{
                                padding: '1.5rem',
                                fontWeight: 'bold',
                                color: 'var(--text-primary)',
                                backgroundColor: 'var(--secondary-dark)'
                            }}>
                                {row.label}
                            </div>

                            {selectedPets.map(pet => {
                                const value = pet[row.key as keyof Pet];

                                if (row.type === 'badge') {
                                    return (
                                        <div key={pet.id} style={{ padding: '1.5rem', textAlign: 'center' }}>
                                            <span className={`difficulty-badge difficulty-${(value as string).toLowerCase()}`}>
                                                {value as string}
                                            </span>
                                        </div>
                                    );
                                }

                                if (row.type === 'list' && Array.isArray(value)) {
                                    return (
                                        <div key={pet.id} style={{ padding: '1.5rem' }}>
                                            <ul style={{
                                                listStyle: 'none',
                                                padding: 0,
                                                margin: 0,
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {(value as string[]).slice(0, 3).map((item, i) => (
                                                    <li key={i} style={{
                                                        marginBottom: '0.5rem',
                                                        fontSize: '0.95rem',
                                                        display: 'flex',
                                                        alignItems: 'start',
                                                        gap: '0.5rem'
                                                    }}>
                                                        <span style={{ color: 'var(--accent-green)' }}>•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                                {(value as string[]).length > 3 && (
                                                    <li style={{
                                                        color: 'var(--text-muted)',
                                                        fontSize: '0.9rem',
                                                        marginTop: '0.5rem'
                                                    }}>
                                                        +{(value as string[]).length - 3} more
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={pet.id} style={{
                                        padding: '1.5rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.5'
                                    }}>
                                        {value as string}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}

            {/* No Selection State */}
            {selectedPets.length < 2 && (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
                    <h2 style={{ marginBottom: '1rem' }}>Select at least 2 pets to compare</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Add pets using the empty slots above to see a detailed comparison
                    </p>
                    {selectedPets.length === 1 && (
                        <button
                            onClick={clearAll}
                            className="btn btn-secondary"
                        >
                            Start Over
                        </button>
                    )}
                </div>
            )}

            {/* Share/Export Options */}
            {selectedPets.length >= 2 && (
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginTop: '2rem',
                    padding: '1rem'
                }}>
                    <button
                        onClick={updateUrl}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>🔗</span>
                        Copy Comparison Link
                    </button>
                    <button
                        onClick={clearAll}
                        className="btn btn-secondary"
                    >
                        Start New Comparison
                    </button>
                </div>
            )}
        </div>
    );
};

export default Compare;