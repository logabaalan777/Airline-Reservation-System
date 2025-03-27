import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaSignOutAlt } from "react-icons/fa";
import "../styles/PassengerAccount.css";
import PassengerNavbar from "../Components/PassengerNavbar";

const PassengerAccount = () => {
  const [passenger, setPassenger] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setPassenger(data);
        }
      })
      .catch((error) => console.error("Error fetching passenger details:", error));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  if (!passenger) {
    return <div className="unique-passenger-loading">Loading Passenger Details...</div>;
  }

  return (
    <>
    <PassengerNavbar />
    <div className="unique-passenger-account-wrapper">
      <div className="unique-passenger-account-container">
        <div className="unique-logout-circle" onClick={handleLogout}>
          <FaSignOutAlt />
        </div>
        
        <div className="unique-profile-header">
          <div className="unique-profile-icon">
            <FaUserCircle />
          </div>
          <h2 className="unique-profile-name">{passenger.name}</h2>
        </div>
        
        <div className="unique-account-details">
          <div className="unique-detail-item">
            <FaEnvelope className="unique-detail-icon" />
            <div className="unique-detail-text">
              <span className="unique-detail-label">Email</span>
              <p>{passenger.email}</p>
            </div>
          </div>
          
          <div className="unique-detail-item">
            <FaVenusMars className="unique-detail-icon" />
            <div className="unique-detail-text">
              <span className="unique-detail-label">Gender</span>
              <p>{passenger.gender}</p>
            </div>
          </div>
          
          <div className="unique-detail-item">
            <FaPhone className="unique-detail-icon" />
            <div className="unique-detail-text">
              <span className="unique-detail-label">Contact</span>
              <p>{passenger.contact}</p>
            </div>
          </div>
          
          <div className="unique-detail-item">
            <FaMapMarkerAlt className="unique-detail-icon" />
            <div className="unique-detail-text">
              <span className="unique-detail-label">Location</span>
              <p>{passenger.location}, {passenger.pincode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PassengerAccount;