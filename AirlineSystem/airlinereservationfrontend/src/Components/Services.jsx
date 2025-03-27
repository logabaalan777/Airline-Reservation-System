import React from "react";
import "../styles/Services.css";
import { FaPlane, FaFilm, FaHeadset, FaCouch, FaAccessibleIcon } from "react-icons/fa"; // Importing icons

const Services = () => {
  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-item">
          <FaPlane className="service-icon" />
          <p>Online Flight Booking</p>
        </div>
        <div className="service-item">
          <FaFilm className="service-icon" />
          <p>In-flight Entertainment</p>
        </div>
        <div className="service-item">
          <FaHeadset className="service-icon" />
          <p>24/7 Customer Support</p>
        </div>
        <div className="service-item">
          <FaCouch className="service-icon" />
          <p>Comfortable Seating</p>
        </div>
        <div className="service-item">
          <FaAccessibleIcon className="service-icon" />
          <p>Special Assistance</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
