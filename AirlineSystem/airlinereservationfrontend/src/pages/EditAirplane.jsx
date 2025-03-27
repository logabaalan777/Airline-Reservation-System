import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/EditAirplane.css"; // Add styling if needed
import AdminNavbar from "../Components/AdminNavbar";

const EditAirplane = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [airplane, setAirplane] = useState(location.state.airplane || {});

  const handleChange = (e) => {
    setAirplane({ ...airplane, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/airplanes/${airplane.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(airplane),
      });

      if (response.ok) {
        alert("Airplane updated successfully!");
        navigate("/view-airplanes");
      } else {
        alert("Failed to update airplane.");
      }
    } catch (error) {
      console.error("Error updating airplane:", error);
    }
  };

  return (
    <><AdminNavbar />
    <div className="edit-airplane-container">
      <h2>Edit Airplane</h2>
      <form onSubmit={handleUpdate}>
        <label>Plane No:</label>
        <input type="text" name="planeNo" value={airplane.planeNo} onChange={handleChange} required />

        <label>Airplane Name:</label>
        <input type="text" name="name" value={airplane.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={airplane.description} onChange={handleChange} required />

        <label>Total Seats:</label>
        <input type="number" name="totalSeats" value={airplane.totalSeats} onChange={handleChange} required />

        <label>Economy Seats:</label>
        <input type="number" name="economySeats" value={airplane.economySeats} onChange={handleChange} required />

        <label>Business Seats:</label>
        <input type="number" name="businessSeats" value={airplane.businessSeats} onChange={handleChange} required />

        <label>First Class Seats:</label>
        <input type="number" name="firstClassSeats" value={airplane.firstClassSeats} onChange={handleChange} required />

        <button type="submit">Update Airplane</button>
      </form>
    </div>
    </>
  );
};

export default EditAirplane;
