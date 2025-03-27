import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PassengerNavbar from "../Components/PassengerNavbar";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
    const location = useLocation();
    const { flight, selectedSeats, seatType: passedSeatType, totalFare: passedTotalFare, passengerId } = location.state || {};
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [calculatedFare, setCalculatedFare] = useState(0);
    const [walletBalance, setWalletBalance] = useState(null);
    const [error, setError] = useState("");
    // 🔹 **Determine seatType from selectedSeats (if missing)**
    const seatType = passedSeatType || (selectedSeats.length > 0 ? selectedSeats[0].seatType : "Economy");

    // 🔹 **Calculate Total Fare**
    useEffect(() => {
        if (!passedTotalFare || passedTotalFare === 0) {
            let seatFare = 0;
            if (seatType?.toLowerCase() === "business") {
                seatFare = flight?.businessFare || 0;
            } else if (seatType?.toLowerCase() === "first class") {
                seatFare = flight?.firstClassFare || 0;
            } else {
                seatFare = flight?.economyFare || 0;
            }
            setCalculatedFare(selectedSeats.length * seatFare);
        } else {
            setCalculatedFare(passedTotalFare);
        }
    }, [seatType, flight, selectedSeats, passedTotalFare]);

    // 🔹 **Fetch Wallet Balance**
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                if (!passengerId) throw new Error("Passenger ID is missing.");
                
                const response = await fetch(`http://localhost:8080/wallets/${passengerId}`);
                if (!response.ok) throw new Error("Failed to fetch wallet balance.");
                
                const data = await response.json();
                setWalletBalance(data.balance);
            } catch (error) {
                console.error("❌ Wallet Fetch Error:", error);
                setError(error.message);
            }
        };

        if (passengerId) fetchWalletBalance();
    }, [passengerId]);

    // 🔹 **Handle Payment**
    const handlePayment = async () => {
        setIsProcessing(true);
        setError("");

        try {
            if (!passengerId) throw new Error("Passenger ID is missing.");
            if (!flight?.id) throw new Error("Flight ID is missing.");
            if (!seatType) throw new Error("Seat type is not selected.");
            if (selectedSeats.length === 0) throw new Error("No seats selected.");
            if (walletBalance === null) throw new Error("Wallet balance not available.");
            if (walletBalance < calculatedFare) {
                alert("❌ Insufficient Wallet Balance. Please add funds.");
                setIsProcessing(false);
                return;
            }

            // ✅ Deduct Money from Wallet
            const deductBalanceResponse = await fetch(`http://localhost:8080/wallets/deductMoney/${passengerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: calculatedFare }),
            });

            if (!deductBalanceResponse.ok) {
                const errMsg = await deductBalanceResponse.text();
                throw new Error(`Wallet deduction failed: ${errMsg}`);
            }

            // ✅ Create Booking (Fix: Ensure seatType is correctly sent)
            const bookingResponse = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    passengerId, 
                    flightId: flight.id,  
                    seatType,  
                    numberOfPassengers: selectedSeats.length,  
                    totalAmount: calculatedFare,  
                }),
            });

            console.log("📌 Booking Request Data:", {
                passengerId,
                flightId: flight.id,
                seatType,
                numberOfPassengers: selectedSeats.length,
                totalAmount: calculatedFare,
            });

            if (!bookingResponse.ok) {
                const errMsg = await bookingResponse.text();
                throw new Error(`Booking creation failed: ${errMsg}`);
            }

            const bookingData = await bookingResponse.json();
            const bookingId = bookingData.id;

            // ✅ Record Payment
            const paymentResponse = await fetch("http://localhost:8080/api/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId,
                    amount: calculatedFare,
                    paymentMethod: "Wallet",
                    paymentStatus: "Completed",
                }),
            });

            if (!paymentResponse.ok) {
                const errMsg = await paymentResponse.text();
                throw new Error(`Payment recording failed: ${errMsg}`);
            }

            // ✅ Book Seats
            const seatBookingResponse = await fetch("http://localhost:8080/api/seats/bookings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    flightId: flight.id,
                    seatNumbers: selectedSeats.map(seat => seat.seatNumber),
                }),
            });

            if (!seatBookingResponse.ok) {
                const errMsg = await seatBookingResponse.text();
                throw new Error(`Seat booking failed: ${errMsg}`);
            }

            // ✅ Success Message & Redirect
            alert(`🎉 Payment Successful! Seats booked: ${selectedSeats.map(seat => seat.seatNumber)}`);
            navigate("/confirmation", { state: { flight, selectedSeats } });

        } catch (error) {
            console.error("❌ Error:", error);
            setError(error.message);
            alert(`❌ ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <PassengerNavbar />
            <div className="payment-page-container">
                <h2>Payment for Flight</h2>
                <h3>{flight?.airplane?.name || "N/A"}</h3>
                <p><strong>Seats:</strong> {selectedSeats.map(seat => seat.seatNumber).join(", ")}</p>
                <p><strong>Seat Types:</strong> {Array.from(new Set(selectedSeats.map(seat => seat.seatType))).join(", ")}</p>
                <h3 className="payment-page-total">Total Amount: ₹{calculatedFare}</h3>

                {walletBalance !== null && (
                    <p className="wallet-balance">
                        <strong>Wallet Balance:</strong> ₹{walletBalance}
                    </p>
                )}

                {error && <p className="error-message">❌ {error}</p>}

                <button 
                    className="payment-page-button" 
                    onClick={handlePayment} 
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Make Payment"}
                </button>

                {walletBalance !== null && walletBalance < calculatedFare && (
                    <button 
                        className="add-funds-button" 
                        onClick={() => navigate("/wallet")}
                    >
                        Add Funds
                    </button>
                )}
            </div>
        </>
    );
};

export default PaymentPage;
