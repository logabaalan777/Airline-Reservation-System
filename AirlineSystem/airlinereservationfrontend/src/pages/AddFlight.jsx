import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "../styles/AddFlight.css";

const AddFlight = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [airports, setAirports] = useState([]);
  const Navigate = useNavigate();
  const [flightData, setFlightData] = useState({
    airplaneId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
    arrivalTime: "",
    flightStatus: "Scheduled",
    economyFare: "",
    businessFare: "",
    firstClassFare: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/airplanes")
      .then((response) => response.json())
      .then((data) => setAirplanes(data))
      .catch((error) => console.error("Error fetching airplanes:", error));

    fetch("http://localhost:8080/api/airports")
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.error("Error fetching airports:", error));
  }, []);

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Extract values from flightData state
    const formattedFlightData = {
      airplane: { id: flightData.airplaneId },
      departureAirport: { id: flightData.departureAirportId },
      arrivalAirport: { id: flightData.arrivalAirportId },
      departureTime: flightData.departureTime,
      arrivalTime: flightData.arrivalTime,
      flightStatus: flightData.flightStatus,
      economyFare: parseFloat(flightData.economyFare),
      businessFare: parseFloat(flightData.businessFare),
      firstClassFare: parseFloat(flightData.firstClassFare),
    };
  
    try {
      const response = await fetch("http://localhost:8080/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedFlightData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      alert("Flight added successfully!");
      Navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding flight:", error);
      alert("Failed to add flight! " + error.message);
    }
  };
  
  

  return (
    <>
      <AdminNavbar />
      <div className="add-flight-container">
        <h2>Add Flight</h2>
        <form onSubmit={handleSubmit} className="add-flight-form">
        {/* Column 1 */}
        <div>
            <label>Airplane:</label>
            <select name="airplaneId" value={flightData.airplaneId} onChange={handleChange} required>
            <option value="">Select Airplane</option>
            {airplanes.map((plane) => (
                <option key={plane.id} value={plane.id}>
                {plane.name} ({plane.planeNo})
                </option>
            ))}
            </select>
        </div>

        {/* Column 2 */}
        <div>
            <label>Flight Status:</label>
            <select name="flightStatus" value={flightData.flightStatus} onChange={handleChange}>
            <option value="Scheduled">Scheduled</option>
            <option value="On-Time">On-Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Cancelled">Cancelled</option>
            </select>
        </div>

        {/* Column 1 */}
        <div>
            <label>Departure Airport:</label>
            <select name="departureAirportId" value={flightData.departureAirportId} onChange={handleChange} required>
            <option value="">Select Departure Airport</option>
            {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.airportCode})
                </option>
            ))}
            </select>
        </div>

        {/* Column 2 */}
        <div>
            <label>Arrival Airport:</label>
            <select name="arrivalAirportId" value={flightData.arrivalAirportId} onChange={handleChange} required>
            <option value="">Select Arrival Airport</option>
            {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.airportCode})
                </option>
            ))}
            </select>
        </div>

        {/* Column 1 */}
        <div>
            <label>Departure Time:</label>
            <input type="datetime-local" name="departureTime" value={flightData.departureTime} onChange={handleChange} required />
        </div>

        {/* Column 2 */}
        <div>
            <label>Arrival Time:</label>
            <input type="datetime-local" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} required />
        </div>

        {/* Column 1 */}
        <div>
            <label>First Class Fare (₹):</label>
            <input type="number" name="firstClassFare" value={flightData.firstClassFare} onChange={handleChange} required />
        </div>

        {/* Column 2 */}
        <div>
            <label>Business Fare (₹):</label>
            <input type="number" name="businessFare" value={flightData.businessFare} onChange={handleChange} required />
        </div>

        {/* Column 1 */}
        <div>
            <label>Economy Fare (₹):</label>
            <input type="number" name="economyFare" value={flightData.economyFare} onChange={handleChange} required />
        </div>

        {/* Full width button */}
        <div className="full-width">
            <button type="submit">Add Flight</button>
        </div>
        </form>
      </div>
    </>
  );
};

export default AddFlight;
