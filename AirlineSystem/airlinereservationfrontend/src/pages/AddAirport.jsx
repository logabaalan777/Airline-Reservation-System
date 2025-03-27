import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddAirport.css"; // Unique CSS for Add Airport'
import AdminNavbar from "../Components/AdminNavbar";

const AddAirport = () => {
  const navigate = useNavigate();
  const [airport, setAirport] = useState({
    name: "",
    location: "",
    airportCode: "",
    address: "",
  });

  const handleChange = (e) => {
    setAirport({ ...airport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/airports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(airport),
      });

      if (response.ok) {
        alert("Airport added successfully!");
        navigate("/view-airports"); 
      } else {
        alert("Failed to add airport.");
      }
    } catch (error) {
      console.error("Error adding airport:", error);
    }
  };

  return (
    <> 
    <AdminNavbar />
    <div className="add-airport-container">
      <h2>Add Airport</h2>
      <form onSubmit={handleSubmit}>
        <label>Airport Name:</label>
        <input type="text" name="name" value={airport.name} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={airport.location} onChange={handleChange} required />

        <label>Airport Code:</label>
        <input type="text" name="airportCode" value={airport.airportCode} onChange={handleChange} required />

        <label>Address:</label>
        <textarea name="address" value={airport.address} onChange={handleChange} required />

        <button type="submit">Add Airport</button>
      </form>
    </div>
    </>
  );
};

export default AddAirport;
