import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Clicking on the AeroFly logo will navigate to the landing page */}
      <div className="logo">
        <Link to="/" className="logo-link">✈️ AeroFly</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/passenger-register">Passenger Register</Link></li>
        <li><Link to="/admin-register">Admin Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
