import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminRegister.css";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const adminData = {
      name: admin.name,
      email: admin.email,
      password: admin.password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/admins/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        alert("Admin registered successfully!");
        navigate("/login");
      } else {
        alert("Registration failed! Email might already be in use.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-register-container">
      <div className="admin-register-box">
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="admin-input-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="admin-input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="admin-input-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="admin-input-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={admin.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already registered? <Link to="/admin-login">Go to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
