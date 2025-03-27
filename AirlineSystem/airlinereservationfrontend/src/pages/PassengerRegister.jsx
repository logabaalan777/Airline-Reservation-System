import React, { useState } from "react";
import "../styles/PassengerRegister.css";
import { useNavigate } from "react-router-dom";

const PassengerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    contact: "",
    age: "",
    location: "",
    pincode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/passengers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        const errorData = await response.text();
        alert("Registration Failed: " + errorData);
      }
    } catch (error) {
      console.error("Error registering passenger:", error);
      alert("Error connecting to the server. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Passenger Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Left Column */}
            <div className="form-column">
              <div className="passenger-input-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="passenger-input-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="passenger-input-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="passenger-input-group">
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="passenger-input-group">
                <label>Contact:</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="passenger-input-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="passenger-input-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your city/location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="passenger-input-group">
                <label>Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
};

export default PassengerRegister;
