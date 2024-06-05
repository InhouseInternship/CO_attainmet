// Navbar.js

import React from 'react';
import logoimg from './logop.png';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logoimg} alt='logo'/>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/HomePage2">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about">About</a>
          </li>
          <li className="nav-item">
            <a href="/">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
