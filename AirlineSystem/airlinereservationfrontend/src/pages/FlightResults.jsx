import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaCheckCircle } from "react-icons/fa";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import PassengerNavbar from "../Components/PassengerNavbar";
import "../styles/FlightResults.css";

const FlightResults = () => {
    const [flights, setFlights] = useState([]);
    const [boarding, setBoarding] = useState("");
    const [destination, setDestination] = useState("");
    const [travelDate, setTravelDate] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("flightResults");
        if (storedData) {
            const { flights, boarding, destination, travelDate } = JSON.parse(storedData);
            setFlights(flights);
            setBoarding(boarding);
            setDestination(destination);
            setTravelDate(travelDate);
        }
    }, []);

    const handleBookNow = (flight) => {
        navigate("/seat-selection", { state: { flight } });
    };

    return (
        <><PassengerNavbar />
      <div className="flight-results">
        <h2>Flight Search Results</h2>
        <p className="route-info">
          <FaPlaneDeparture /> {boarding} → <FaPlaneArrival /> {destination}
        </p>
        <p className="travel-date">Travel Date: {travelDate}</p>

        {flights.length > 0 ? (
          <div className="flights-container">
            {flights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-header">
                  <h3>{flight.airplane?.name}</h3>
                  <MdOutlineAirplaneTicket className="ticket-icon" />
                </div>

                <p><FaPlaneDeparture className="icon" /> <strong>From:</strong> {flight.departureAirport?.name}</p>
                <p><FaPlaneArrival className="icon" /> <strong>To:</strong> {flight.arrivalAirport?.name}</p>
                <p><FaClock className="icon" /> <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                <p><FaClock className="icon" /> <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p><FaCheckCircle className="icon status-icon" /> <strong>Status:</strong> {flight.flightStatus}</p>
                
                <p className="price">Economy Fare: ₹{flight.economyFare}</p>

                <button className="book-now" onClick={() => handleBookNow(flight)}>Book Ticket</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-flights">No flights available for the selected route.</p>
        )}
      </div>
      </>
    );
};

export default FlightResults;
