import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import your CSS file

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>TechWithMolato</h1>
          <div className="contact-me">
            <a
              href="mailto:youremail@example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
