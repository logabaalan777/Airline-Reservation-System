import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // ✅ Import tick icon
import PassengerNavbar from "../Components/PassengerNavbar";
import "../styles/BookingConfirmation.css"; // 🎨 Import styles

const BookingConfirmation = () => {
    const location = useLocation();
    const { flight, selectedSeats } = location.state || {};
    const navigate = useNavigate();

    return (
        <>
        <PassengerNavbar />
        <div className="confirmation-container">
            <div className="confirmation-card">
                <FaCheckCircle className="check-icon" /> {/* ✅ Large Tick Icon */}
                <h1>Booking Confirmed!</h1>
                <p className="thank-you">🎉 Your flight has been successfully booked.</p>

                <div className="flight-details">
                    <h2>🛫 Flight Details</h2>
                    <p><strong>Flight Name:</strong> {flight?.airplane?.name || "N/A"}</p>
                    <p><strong>Departure:</strong> {flight?.departureAirport?.name} - {flight?.departureTime}</p>
                    <p><strong>Arrival:</strong> {flight?.arrivalAirport?.name} - {flight?.arrivalTime}</p>
                </div>

                <div className="seat-details">
                    <h2>💺 Seat Information</h2>
                    <p><strong>Seats:</strong> {selectedSeats.map(seat => seat.seatNumber).join(", ")}</p>
                    <p><strong>Seat Type:</strong> {Array.from(new Set(selectedSeats.map(seat => seat.seatType))).join(", ")}</p>
                </div>

                <button className="home-button" onClick={() => navigate("/passenger-dashboard")}>
                    🏠 Go to Home
                </button>
            </div>
        </div>
        </>
    );
};

export default BookingConfirmation;
