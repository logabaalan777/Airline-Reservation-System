import React, { useState, useEffect } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from "react-icons/fa";
import PassengerNavbar from "../Components/PassengerNavbar";
import "../styles/PassengerDashboard.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PassengerDashboard = () => {
  const [passengerName, setPassengerName] = useState("");
  const [airports, setAirports] = useState([]);
  const [boarding, setBoarding] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();


  const FlightResults = () => {
    const location = useLocation();
    const { flights, boarding, destination, travelDate } = location.state || {};
  };

  useEffect(() => {
    const storedName = localStorage.getItem("passengerName");
    if (storedName) {
      setPassengerName(storedName);
    }

    // Fetch airports from backend
    fetch("http://localhost:8080/api/airports")
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.error("Error fetching airports:", error));
  }, []);

  const defaultFlights = [
    { id: 1, airline: "Air India", price: "₹7,500", duration: "2h 30m", from: "Cochin", to: "Mumbai" },
    { id: 2, airline: "IndiGo", price: "₹6,800", duration: "2h 20m", from: "Jammu", to: "Mumbai" },
    { id: 3, airline: "SpiceJet", price: "₹7,200", duration: "2h 25m", from: "Delhi", to: "Mumbai" },
    { id: 4, airline: "Vistara", price: "₹8,000", duration: "2h 10m", from: "Kolkata", to: "Mumbai" },
    { id: 6, airline: "Indigo", price: "₹8,000", duration: "2h 10m", from: "Pune", to: "Mumbai" },
  ];

  const handleSearch = () => {
    if (!boarding || !destination || !travelDate) {
      alert("Please select departure, destination, and date!");
      return;
    }
  
    if (boarding === destination) {
      alert("Departure and Destination cannot be the same!");
      return;
    }
  
    fetch(`http://localhost:8080/flights/search?from=${boarding}&to=${destination}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Flights received from API:", data);
        const flightsData = Array.isArray(data) ? data : [];
  
        // Store in local storage
        localStorage.setItem("flightResults", JSON.stringify({ flights: flightsData, boarding, destination, travelDate }));
  
        navigate("/flight-results");
      })
      .catch((error) => console.error("Error fetching flights:", error));
  };
  
  return (
    <div className="passenger-dashboard">
      <PassengerNavbar />

      <div className="greeting">
        <h2>Hello, {passengerName}! ✈️</h2>
        <p>Where would you like to travel today?</p>
      </div>

      {/* Flight Search */}
      <div className="flight-search">
        <div className="search-input-group">
          <FaPlaneDeparture className="icon" />
          <select value={boarding} onChange={(e) => setBoarding(e.target.value)}>
            <option value="">Select Departure Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>
        <div className="search-input-group">
          <FaPlaneArrival className="icon" />
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select Destination Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>
        <div className="search-input-group">
          <FaCalendarAlt className="icon" />
          <input
            type="date"
            value={travelDate}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>
      </div>

      <div className="search-container">
        <button className="search-button" onClick={handleSearch}>
          Search Flights
        </button>
      </div>

      {/* Default Flight Details */}
      <div className="flight-carousel">
        {defaultFlights.map((flight) => (
          <div className="flight-card" key={flight.id}>
            <h3>{flight.airline}</h3>
            <p>From: {flight.from} → To: {flight.to}</p>
            <p>Duration: {flight.duration}</p>
            <p className="price">{flight.price}</p>
            <button className="book-now">Book Now</button>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© 2025 AeroFly. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PassengerDashboard;
