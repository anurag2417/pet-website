// src/pages/PetProfile.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPetById, getPetsByCategory, type Pet } from '../data/petData';
import PrintCareSheet from '../components/PrintCareSheet';
import PDFCareSheet from '../components/PDFCareSheet';

const PetProfile = () => {
  const { categoryId, petId } = useParams<{ categoryId: string; petId: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [relatedPets, setRelatedPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);

    // Get the current pet
    const foundPet = getPetById(categoryId || '', petId || '');
    setPet(foundPet || null);

    // Get related pets (same category, different from current)
    if (foundPet) {
      const sameCategory = getPetsByCategory(categoryId || '')
        .filter(p => p.id !== foundPet.id)
        .slice(0, 3); // Show max 3 related pets
      setRelatedPets(sameCategory);
    }

    setLoading(false);

    // Scroll to top when pet changes
    window.scrollTo(0, 0);
  }, [categoryId, petId]);

  // Loading state
  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '5px solid var(--border-color)',
          borderTopColor: 'var(--accent-green)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 2rem'
        }}></div>
        <p>Loading pet profile...</p>
      </div>
    );
  }

  // Not found state
  if (!pet) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '1rem',
          color: 'var(--text-muted)'
        }}>
          🐾
        </div>
        <h2>Pet Profile Not Found</h2>
        <p style={{
          marginBottom: '2rem',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          margin: '1rem auto 2rem'
        }}>
          The pet you're looking for doesn't exist or hasn't been added to our encyclopedia yet.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/categories" className="btn btn-primary">
            Browse Categories
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/categories" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Categories</Link>
        <span>/</span>
        <Link to={`/category/${pet.category}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          {pet.categoryName}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{pet.name}</span>
      </div>

      {/* Pet Profile Card */}
      <div className="pet-profile">
        {/* Header Section with Image */}
        <div className="pet-header">
          <img
            src={pet.gallery[activeImage] || pet.image}
            alt={pet.name}
            className="pet-header-image"
          />
          <div className="pet-header-overlay">
            <h1 className="pet-name">{pet.name}</h1>
            <p className="pet-summary">{pet.summary}</p>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {pet.gallery && pet.gallery.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '1rem',
            backgroundColor: 'var(--secondary-dark)',
            overflowX: 'auto'
          }}>
            {pet.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${pet.name} ${index + 1}`}
                onClick={() => setActiveImage(index)}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: activeImage === index ? '3px solid var(--accent-green)' : '3px solid transparent',
                  opacity: activeImage === index ? 1 : 0.7,
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        )}

        {/* Quick Facts Section */}
        <div className="quick-facts">
          <div className="fact-card">
            <div className="fact-icon">⏳</div>
            <div className="fact-label">Lifespan</div>
            <div className="fact-value">{pet.lifespan}</div>
          </div>
          <div className="fact-card">
            <div className="fact-icon">📏</div>
            <div className="fact-label">Size</div>
            <div className="fact-value">{pet.size}</div>
          </div>
          <div className="fact-card">
            <div className="fact-icon">😊</div>
            <div className="fact-label">Temperament</div>
            <div className="fact-value">{pet.temperament.split(',')[0]}</div>
          </div>
          <div className="fact-card">
            <div className="fact-icon">📊</div>
            <div className="fact-label">Care Level</div>
            <div className="fact-value">
              <span className={`difficulty-badge difficulty-${pet.difficulty.toLowerCase()}`}>
                {pet.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          padding: '2rem'
        }}>
          {/* Left Column - Detailed Care Guide */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Complete Care Guide
              </h2>
              <button
                onClick={() => setShowPrintModal(true)}
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px'
                }}
              >
                <span>🖨️</span> Print
              </button>
            </div>

            {/* Habitat */}
            <div className="care-section" style={{ marginBottom: '2rem' }}>
              <h3 style={{
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.3rem',
                marginBottom: '1rem'
              }}>
                <span>🏠</span> Habitat & Environment
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pet.habitat.map((item, index) => (
                  <li key={index} style={{
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent-green)'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Diet */}
            <div className="care-section" style={{ marginBottom: '2rem' }}>
              <h3 style={{
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.3rem',
                marginBottom: '1rem'
              }}>
                <span>🥕</span> Diet & Nutrition
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pet.diet.map((item, index) => (
                  <li key={index} style={{
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent-green)'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Health */}
            <div className="care-section" style={{ marginBottom: '2rem' }}>
              <h3 style={{
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.3rem',
                marginBottom: '1rem'
              }}>
                <span>💚</span> Health & Wellness
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pet.health.map((item, index) => (
                  <li key={index} style={{
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent-green)'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Behavior */}
            <div className="care-section">
              <h3 style={{
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.3rem',
                marginBottom: '1rem'
              }}>
                <span>🤝</span> Handling & Behavior
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pet.behavior.map((item, index) => (
                  <li key={index} style={{
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent-green)'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Fun Facts, Quick Info, and Action Buttons */}
          <div>
            {/* Fun Facts Section (your existing code) */}
            <div className="fun-facts" style={{
              backgroundColor: 'var(--secondary-dark)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)'
              }}>
                ⭐ Fun Facts
              </h3>
              {pet.funFacts.map((fact, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '10px',
                  borderLeft: '4px solid var(--accent-green)',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic'
                }}>
                  {fact}
                </div>
              ))}
            </div>

            {/* Quick Stats Card (your existing code) */}
            <div style={{
              backgroundColor: 'var(--secondary-dark)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                📋 Quick Stats
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Category:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{pet.categoryName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Full Temperament:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{pet.temperament}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Care Difficulty:</span>
                  <span>
                    <span className={`difficulty-badge difficulty-${pet.difficulty.toLowerCase()}`}>
                      {pet.difficulty}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS SECTION - PDF Download & Print */}
            <div style={{
              backgroundColor: 'var(--secondary-dark)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>📋</span> Care Resources
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {/* PDF Download Button */}
                <button
                  onClick={() => setShowPDFModal(true)}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 10px rgba(220, 53, 69, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c82333';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(220, 53, 69, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc3545';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(220, 53, 69, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>📥</span>
                  Download PDF Care Guide
                </button>

                {/* Print Button */}
                <button
                  onClick={() => setShowPrintModal(true)}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--accent-green)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 10px rgba(76, 175, 158, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3d8b7e';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(76, 175, 158, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-green)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(76, 175, 158, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🖨️</span>
                  Print Care Sheet
                </button>
              </div>

              {/* Helper text */}
              <p style={{
                marginTop: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textAlign: 'center'
              }}>
                Get a printable version or PDF guide to keep for reference
              </p>
            </div>

            {/* Social Share Buttons - Your existing code */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              marginTop: '1rem'
            }}>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4267B2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s',
                flex: 1
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#365899';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4267B2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                Share
              </button>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#1DA1F2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s',
                flex: 1
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a91da';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1DA1F2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                Tweet
              </button>
              <button style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#25D366',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s',
                flex: 1
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#20b859';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#25D366';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Pets Section */}
      {relatedPets.length > 0 && (
        <div style={{ padding: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            You Might Also Like
          </h2>
          <div className="category-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {relatedPets.map((relatedPet) => (
              <Link
                key={relatedPet.id}
                to={`/pet/${relatedPet.category}/${relatedPet.id}`}
                className="category-card"
                style={{ height: '100%' }}
              >
                <img
                  src={relatedPet.image}
                  alt={relatedPet.name}
                  className="category-image"
                  style={{ height: '150px' }}
                />
                <div className="category-content">
                  <h3 className="category-title" style={{ fontSize: '1.2rem' }}>
                    {relatedPet.name}
                  </h3>
                  <p className="category-description" style={{
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                  }}>
                    {relatedPet.summary.substring(0, 80)}...
                  </p>
                  <span className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                    View Profile →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Modals */}
      {showPrintModal && <PrintCareSheet pet={pet} onClose={() => setShowPrintModal(false)} />}
      {showPDFModal && <PDFCareSheet pet={pet} onClose={() => setShowPDFModal(false)} />}

      {/* Add CSS animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PetProfile;