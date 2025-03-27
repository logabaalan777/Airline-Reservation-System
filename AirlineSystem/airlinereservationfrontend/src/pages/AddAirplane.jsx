import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddAirplane.css";
import AdminNavbar from "../Components/AdminNavbar";

const AddAirplane = () => {
  const navigate = useNavigate();
  const [airplane, setAirplane] = useState({
    name: "",
    planeNo: "",
    description: "",
    totalSeats: "",
    economySeats: "",
    businessSeats: "",
    firstClassSeats: "",
  });

  const handleChange = (e) => {
    setAirplane({ ...airplane, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/airplanes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(airplane),
      });

      if (response.ok) {
        alert("Airplane added successfully!");
        navigate("/admin-dashboard"); 
      } else {
        alert("Failed to add airplane.");
      }
    } catch (error) {
      console.error("Error adding airplane:", error);
      alert("An error occurred while adding the airplane.");
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="add-airplane-container">
      <h2>Add New Airplane</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Airplane Name" required onChange={handleChange} />
        <input type="text" name="planeNo" placeholder="Plane Number" required onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="number" name="totalSeats" placeholder="Total Seats" required onChange={handleChange} />
        <input type="number" name="economySeats" placeholder="Economy Seats" required onChange={handleChange} />
        <input type="number" name="businessSeats" placeholder="Business Seats" required onChange={handleChange} />
        <input type="number" name="firstClassSeats" placeholder="First Class Seats" required onChange={handleChange} />
        <button type="submit">Add Airplane</button>
      </form>
    </div>
    </>
  );
};

export default AddAirplane;
