import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "../styles/ViewAirports.css"; // Unique CSS for View Airports
import AdminNavbar from "../Components/AdminNavbar";
const ViewAirports = () => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/airports");
      if (!response.ok) throw new Error("Failed to fetch airports");
      const data = await response.json();
      setAirports(data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/airports/${id}`, { method: "DELETE" });

        if (response.ok) {
          alert("Airport deleted successfully!");
          fetchAirports(); // Refresh list after deletion
        } else {
          alert("Failed to delete airport.");
        }
      } catch (error) {
        console.error("Error deleting airport:", error);
      }
    }
  };

  return (
    <> 
    <AdminNavbar />
    <div className="view-airports-container">
      <h2>All Airports</h2>
      <table>
        <thead>
          <tr>
            <th>Airport Name</th>
            <th>Location</th>
            <th>Airport Code</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.name}</td>
              <td>{airport.location}</td>
              <td>{airport.airportCode}</td>
              <td>{airport.address}</td>
              <td>
                <FaTrash className="delete-icon" onClick={() => handleDelete(airport.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ViewAirports;
