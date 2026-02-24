// components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
        </div>
        
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;