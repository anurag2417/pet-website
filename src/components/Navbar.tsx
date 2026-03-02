// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user, isAuthenticated } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <div className="logo-icon">🐾</div>
          <span>PetPedia</span>
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
          </li>
          <li className="nav-item">
            <Link to="/compare" onClick={() => setIsOpen(false)}>Compare</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
          
          {/* User Menu - Desktop */}
          <li className="nav-item user-menu">
            {isAuthenticated ? (
              <Link to="/dashboard" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                backgroundColor: 'var(--secondary-dark)',
                padding: '0.5rem 1rem',
                borderRadius: '30px',
                border: '1px solid var(--border-color)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>👤</span>
                <span>{user?.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-green), var(--accent-teal))',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 175, 158, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </div>
        
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default Navbar;