import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaTicketAlt, FaWallet } from "react-icons/fa";
import "../styles/PassengerDashboard.css";

const PassengerNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/passenger-dashboard" className="logo-link">✈️ AeroFly</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/wallet" className="nav-link">
            <FaWallet className="nav-icon" /> Wallet
          </Link>
        </li>
        <li>
          <Link to="/my-bookings" className="nav-link">
            <FaTicketAlt className="nav-icon" /> My Bookings
          </Link>
        </li>
        <li>
          <Link to="/pass-account" className="nav-link">
            <FaUserCircle className="nav-icon" /> Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PassengerNavbar;
