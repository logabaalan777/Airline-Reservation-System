import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PASSENGER");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/users/${email}`);
      if (!response.ok) {
        throw new Error("User not found");
      }

      const user = await response.json();

      if (user && user.password === password) {
        alert("Login Successful!");

        // Store passenger name in localStorage
        console.log("passengerId :",user.id);
        localStorage.setItem("passengerId", user.id);
        localStorage.setItem("passengerName", user.name);  
        localStorage.setItem("userRole", user.role);  
        localStorage.setItem("userEmail",user.email);
        console.log(user.email);

        if (role === "ADMIN" && user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "PASSENGER" && user.role === "PASSENGER") {
          navigate("/passenger-dashboard");
        } else {
          alert("Incorrect role selected!");
        }
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      alert("Login failed. Check credentials.");
      console.error("Error:", error);
    }
};


  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to AeroFly</h2>
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="role">Login as:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="PASSENGER">Passenger</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-link">
          Don't have an account? <a href="/register">Register Here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
