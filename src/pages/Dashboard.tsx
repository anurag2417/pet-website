// src/pages/Dashboard.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AuthModal from '../components/AuthModal';

const Dashboard = () => {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    favorites, 
    reminders, 
    notes,
    completeReminder,
    deleteReminder,
    deleteNote 
  } = useUser();
  
  const [activeTab, setActiveTab] = useState<'favorites' | 'reminders' | 'notes'>('favorites');
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h1 style={{ marginBottom: '1rem' }}>My Dashboard</h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          maxWidth: '500px', 
          margin: '0 auto 2rem' 
        }}>
          Sign in to access your saved favorites, care reminders, and personal notes
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="btn btn-primary"
          style={{ padding: '1rem 2rem' }}
        >
          Sign In / Register
        </button>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }

  const getUpcomingReminders = () => {
    const today = new Date();
    return reminders
      .filter(r => !r.completed)
      .sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime())
      .slice(0, 5);
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--charcoal) 100%)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Welcome back, {user?.name}! 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Member since {new Date(user?.joinDate || '').toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ padding: '0.75rem 1.5rem' }}
        >
          Sign Out
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-green)' }}>{favorites.length}</h3>
          <p style={{ color: 'var(--text-muted)' }}>Saved Pets</p>
        </div>
        
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-green)' }}>
            {reminders.filter(r => !r.completed).length}
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>Active Reminders</p>
        </div>
        
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-green)' }}>{notes.length}</h3>
          <p style={{ color: 'var(--text-muted)' }}>Personal Notes</p>
        </div>
      </div>

      {/* Upcoming Reminders */}
      {getUpcomingReminders().length > 0 && (
        <div style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '15px',
          border: '1px solid var(--border-color)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⏰</span> Upcoming Reminders
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {getUpcomingReminders().map(reminder => (
              <div key={reminder.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'var(--secondary-dark)',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>{reminder.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {reminder.petName} • Due: {new Date(reminder.nextDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => completeReminder(reminder.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--accent-green)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  ✓ Complete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '2px solid var(--border-color)',
        marginBottom: '2rem'
      }}>
        {[
          { id: 'favorites', label: '❤️ Favorites', icon: '❤️' },
          { id: 'reminders', label: '⏰ Reminders', icon: '⏰' },
          { id: 'notes', label: '📝 Notes', icon: '📝' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '1rem 2rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--accent-green)' : 'none',
              color: activeTab === tab.id ? 'var(--accent-green)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '600' : '400',
              transition: 'all 0.3s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '400px' }}>
        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  You haven't saved any favorites yet
                </p>
                <Link to="/categories" className="btn btn-primary">
                  Browse Pets
                </Link>
              </div>
            ) : (
              <div className="category-grid">
                {favorites.map(pet => (
                  <div key={pet.id} className="category-card" style={{ position: 'relative' }}>
                    <button
                      onClick={() => removeFavorite(pet.id)}
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
                        zIndex: 10
                      }}
                    >
                      ✕
                    </button>
                    <Link to={`/pet/${pet.category}/${pet.id}`}>
                      <img src={pet.image} alt={pet.name} className="category-image" />
                      <div className="category-content">
                        <h3 className="category-title">{pet.name}</h3>
                        <p className="category-description">{pet.summary}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div>
            {reminders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No reminders set yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reminders.map(reminder => (
                  <div key={reminder.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '15px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <input
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => completeReminder(reminder.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer'
                        }}
                      />
                      <div>
                        <h3 style={{ 
                          marginBottom: '0.25rem',
                          textDecoration: reminder.completed ? 'line-through' : 'none',
                          opacity: reminder.completed ? 0.6 : 1
                        }}>
                          {reminder.title}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {reminder.petName} • {reminder.frequency} • Next: {new Date(reminder.nextDate).toLocaleDateString()}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          {reminder.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid #dc3545',
                        color: '#dc3545',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div>
            {notes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No notes yet</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {notes.map(note => (
                  <div key={note.id} style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '15px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ marginBottom: '0.25rem' }}>{note.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {note.petName} • Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          border: '1px solid #dc3545',
                          color: '#dc3545',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;