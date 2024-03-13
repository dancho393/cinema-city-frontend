import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/image2.png'; // Update the path accordingly
import './Navbar.css';

const Navbar = () => {
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/logged" className="navbar-link">
            Home
          </Link>
          <Link to="/comingsoon" className="navbar-link">
            Coming Soon
          </Link>
        </div>
        <Link to="/" className="navbar-logo">
          {/* Add your logo here */}
          <img src={logoImage} alt="Your Logo" className="logo-image" />
        </Link>
        <div className="navbar-links">
          <Link to="/schedule" className="navbar-link">
            Schedule
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;