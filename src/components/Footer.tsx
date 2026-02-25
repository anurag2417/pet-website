// src/components/Footer.tsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>PetPedia</h3>
          <p>Your comprehensive guide to pet care and animal knowledge.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: info@petpedia.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Pet Care Lane</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)'
      }}>
        <p>&copy; 2024 PetPedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;