import React, { useEffect, useState } from "react";
import { FaPlane, FaBuilding, FaPlus, FaEye, FaTrash } from "react-icons/fa";
import AdminNavbar from "../Components/AdminNavbar";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  localStorage.getItem("userEmail");
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    fetch("http://localhost:8080/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleDeleteFlight = (flightId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      fetch(`http://localhost:8080/flights/${flightId}`, { method: "DELETE" })
        .then(() => {
          setFlights(flights.filter(flight => flight.id !== flightId));
        })
        .catch(error => console.error("Error deleting flight:", error));
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard">
        <h1 className="admin-welcome">Welcome, Admin!</h1>

        {/* Grid Section */}
        <div className="admin-grid">
          <div className="grid-item" onClick={() => handleNavigate("/add-airplane")}>
            <FaPlane className="grid-icon" />
            <p>Add Airplane</p>
            <FaEye className="eye-icon" onClick={(e) => { e.stopPropagation(); navigate("/view-airplanes"); }} />
          </div>
          
          <div className="grid-item" onClick={() => handleNavigate("/add-airport")}>
            <FaBuilding className="grid-icon" />
            <p>Add Airport</p>
            <FaEye className="eye-icon" onClick={(e) => { e.stopPropagation(); navigate("/view-airports"); }} />
          </div>
          
          <div className="grid-item" onClick={() => handleNavigate("/add-flight")}>
            <FaPlus className="grid-icon" />
            <p>✈️ Add Flight</p>
          </div>
        </div>

        {/* Scheduled Flights Table */}
        <h2 className="scheduled-title">Scheduled Flights</h2>
        <table className="flights-table">
          <thead>
            <tr>
              <th>Airplane No</th>
              <th>Airplane Name</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Departure Time</th>
              <th>Fare (Economy)</th>
              <th>Fare (Business)</th>
              <th>Fare (First Class)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.airplane.planeNo}</td>
              <td>{flight.airplane.name}</td>
              <td>{flight.departureAirport.name} ({flight.departureAirport.airportCode})</td>
              <td>{flight.arrivalAirport.name} ({flight.arrivalAirport.airportCode})</td>
              <td>{new Date(flight.departureTime).toLocaleString()}</td>
              <td>₹{flight.economyFare}</td>
              <td>₹{flight.businessFare}</td>
              <td>₹{flight.firstClassFare}</td>
              <td>{flight.flightStatus}</td> {/* Removed select dropdown */}
              <td>
                <FaTrash className="delete-icon" onClick={() => handleDeleteFlight(flight.id)} />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
