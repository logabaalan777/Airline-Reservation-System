import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/ViewAirplanes.css";
import AdminNavbar from "../Components/AdminNavbar";

const ViewAirplanes = () => {
  const [airplanes, setAirplanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const fetchAirplanes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/airplanes");
      if (!response.ok) throw new Error("Failed to fetch airplanes");
      const data = await response.json();
      setAirplanes(data);
    } catch (error) {
      console.error("Error fetching airplanes:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this airplane?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/airplanes/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("Airplane deleted successfully!");
          fetchAirplanes(); // Refresh the list after deletion
        } else {
          const errorText = await response.text();
          alert(`Failed to delete airplane: The Flight is in sheduled`);
        }
      } catch (error) {
        console.error("Error deleting airplane:", error);
        alert("Error deleting airplane. Please try again.");
      }
    }
  };
  
  const handleEdit = (plane) => {
    navigate("/edit-airplane", { state: { airplane: plane } });
  };

  return (
    <>
      <AdminNavbar />
      <div className="view-airplanes-container">
        <h2>All Airplanes</h2>
        <table>
          <thead>
            <tr>
              <th>Plane No</th>
              <th>Airplane Name</th>
              <th>Total Seats</th>
              <th>Economy Seats</th>
              <th>Business Seats</th>
              <th>First Class Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airplanes.map((plane) => (
              <tr key={plane.id}>
                <td>{plane.planeNo}</td>
                <td>{plane.name}</td>
                <td>{plane.totalSeats}</td>
                <td>{plane.economySeats}</td>
                <td>{plane.businessSeats}</td>
                <td>{plane.firstClassSeats}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => handleEdit(plane)} />
                  <FaTrash className="delete-icon" onClick={() => handleDelete(plane.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewAirplanes;
