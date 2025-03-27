import React, { useEffect, useState } from "react";
import "../styles/MyBooking.css"; // Ensure this file is correctly linked
import PassengerNavbar from "../Components/PassengerNavbar";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [passengerName, setPassengerName] = useState("");
    const passengerId = localStorage.getItem("passengerId");

    useEffect(() => {
        // Fetch passenger's bookings using fetch API
        if (!passengerId) {
            console.error("No passenger ID found in localStorage.");
            return;
        }

        fetch(`http://localhost:8080/api/bookings/passenger/${passengerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setBookings(data);
                if (data.length > 0) {
                    setPassengerName(data[0].passenger.name);
                }
            })
            .catch(error => console.error("Error fetching bookings:", error));
    }, [passengerId]);

    return (
        <>
        <PassengerNavbar />
        <div className="my-bookings-page-container">
            <h2 className="my-bookings-title">My Bookings</h2>
            <h3 className="my-bookings-passenger-name">Passenger: {passengerName}</h3>
            {bookings.length > 0 ? (
                <div className="my-bookings-table-container">
                    <table className="my-bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Seat Type</th>
                                <th>Passengers</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.seatType}</td>
                                    <td>{booking.numberOfPassengers}</td>
                                    <td>₹{booking.totalAmount}</td>
                                    <td className={`status-${booking.status.toLowerCase()}`}>{booking.status}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="my-bookings-no-data">No bookings found.</p>
            )}
        </div>
        </>
    );
};

export default MyBookings;
