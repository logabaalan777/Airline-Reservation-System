import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
import "../styles/AdminAccount.css";
import { FaUserCircle, FaEnvelope, FaUserShield, FaSignOutAlt } from "react-icons/fa";

const AdminAccount = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail"); // Assuming admin email is stored after login

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAdmin(data);
        }
      })
      .catch((error) => console.error("Error fetching admin details:", error));
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  if (!admin) {
    return <div className="loading-message">Loading Admin Details...</div>;
  }

  return (
    <>
    <AdminNavbar/>
    <div className="admin-account-page-detail-exp">
      <div className="admin-account-card-detail">
        <div className="admin-profile-icon">
          <FaUserCircle size={80} />
        </div>
        <h2>{admin.name}</h2>
        <p><FaEnvelope /> <strong>Email:</strong> {admin.email}</p>
        <p><FaUserShield /> <strong>Role:</strong> {admin.role}</p>
      </div>

      <button className="admin-logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> 
      </button>
    </div>
    </>
  );
};

export default AdminAccount;
