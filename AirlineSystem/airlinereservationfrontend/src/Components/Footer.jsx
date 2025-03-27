import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About AeroFly</h3>
          <p>
            AeroFly is your ultimate travel partner, offering seamless airline reservations with the best customer service. Fly with comfort and confidence.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@aerofly.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Sky Avenue, New York, USA</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/aerofly.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/aerofly.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/aerofly.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 AeroFly. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
