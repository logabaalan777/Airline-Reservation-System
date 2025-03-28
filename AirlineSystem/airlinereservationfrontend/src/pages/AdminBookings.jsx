import React, { useEffect, useState } from "react";
import "../styles/AdminBookings.css"; // Ensure unique styling
import AdminNavbar from "../Components/AdminNavbar";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch all bookings
        fetch("http://localhost:8080/api/bookings/all")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                return response.json();
            })
            .then(data => setBookings(data))
            .catch(error => console.error("Error fetching bookings:", error));
    }, []);

    return (
        <>    
      <AdminNavbar />
        <div className="admin-bookings-page-container">
            <h2 className="admin-bookings-title">All Bookings</h2>
            {bookings.length > 0 ? (
                <div className="admin-bookings-table-container">
                    <table className="admin-bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Passenger Name</th>
                                <th>Passenger Email</th>
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
                                    <td>{booking.passenger?.name || "N/A"}</td>
                                    <td>{booking.passenger?.email || "N/A"}</td>
                                    <td>{booking.seatType}</td>
                                    <td>{booking.numberOfPassengers}</td>
                                    <td>₹{booking.totalAmount}</td>
                                    <td className={`admin-booking-status-${booking.status.toLowerCase()}`}>{booking.status}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="admin-bookings-no-data">No bookings found.</p>
            )}
        </div>
        </>
    );
};

export default AdminBookings;
