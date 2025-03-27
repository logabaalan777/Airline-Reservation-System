import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaPlane } from "react-icons/fa";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        <Link to="/admin-dashboard" className="admin-logo-link">✈️ AeroFly</Link>
      </div>
      <ul className="admin-nav-links">
        <li>
          <Link to="/admin-bookings" className="admin-nav-link">
            <FaPlane className="admin-nav-icon" /> All Bookings
          </Link>
        </li>
        <li>
          <Link to="/admin-account" className="admin-nav-link">
            <FaUserCircle className="nav-icon" /> Admin Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
