import React from 'react';
import { HouseIcon } from './Icons';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, onLogout, onLoginClick }) {
  return (
    <nav className="sp-navbar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <a className="sp-brand" href="/" aria-label="Sowmiya Properties home">
        <div className="brand-icon" aria-hidden="true">
          <HouseIcon size={22} color="white" />
        </div>
        Sowmiya <span className="brand-accent">&nbsp;Properties</span>
      </a>

      {/* Right side */}
      <div className="nav-right">
        {/* Contact always visible */}
        <a href="#contact" className="nav-contact">
          Contact
        </a>
 {isLoggedIn ? (
          <button
            className="btn-nav-logout"
            onClick={onLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (
          <button
            className="btn-nav-login"
            onClick={onLoginClick}
            aria-label="Go to login"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
