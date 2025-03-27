import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PassengerNavbar from "../Components/PassengerNavbar";

// Import icons 
import { 
    Plane, 
    MapPin, 
    Calendar, 
    Clock, 
    AlertCircle, 
    DollarSign, 
    Coffee, 
    Wind, 
    Utensils, 
    Wifi, 
    Film, 
    BathIcon
} from "lucide-react";

import "../styles/SeatSelection.css";

const SeatSelection = () => {
    const location = useLocation();
    const flight = location.state?.flight;
    
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();
    const memoizedFlight = useMemo(() => flight, [flight?.id]);
    const passengerId = location.state?.passengerId || localStorage.getItem("passengerId"); 

    useEffect(() => {
        const fetchSeats = async () => {
            if (!memoizedFlight || !memoizedFlight.id) return;

            try {
                const res = await fetch(`http://localhost:8080/api/seats/flight/${memoizedFlight.id}`);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();
                setSeats(data);
            } catch (err) {
                console.error("Error fetching seats:", err);
            }
        };

        fetchSeats();
    }, [memoizedFlight]);

    const generateSeats = (category) => {
        return seats
            .filter(seat => seat.seatType.toLowerCase() === category.toLowerCase())
            .map(seat => ({ ...seat, isBooked: seat.booked }));
    };

    const economySeats = generateSeats("Economy");
    const businessSeats = generateSeats("Business");
    const firstClassSeats = generateSeats("First Class");

    const allSeats = [...firstClassSeats, ...businessSeats, ...economySeats];

    const handleSeatSelect = (seat) => {
        if (seat.isBooked) return;

        setSelectedSeats((prev) =>
            prev.find((s) => s.seatNumber === seat.seatNumber)
                ? prev.filter((s) => s.seatNumber !== seat.seatNumber)
                : [...prev, { seatNumber: seat.seatNumber, seatType: seat.seatType }]
        );
    };

    // Calculate total fare dynamically for multiple seat types
    const calculateTotalFare = () => {
        return selectedSeats.reduce((total, seat) => {
            let seatFare = 0;
            if (seat.seatType.toLowerCase() === "business") {
                seatFare = flight?.businessFare || 0;
            } else if (seat.seatType.toLowerCase() === "first class") {
                seatFare = flight?.firstClassFare || 0;
            } else {
                seatFare = flight?.economyFare || 0;
            }
            return total + seatFare;
        }, 0);
    };

    const handleProceedToPayment = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat before proceeding.");
            return;
        }

        const totalFare = calculateTotalFare();

        navigate("/payment", {
            state: {
                flight,
                passengerId,
                selectedSeats, // Now contains seatNumber + seatType
                totalFare, // Correctly calculated for mixed seat types
            }
        });
    };

    // Amenities based on seat type
    const getAmenities = (seatType) => {
        if (seatType.toLowerCase() === "economy") {
            return [
                { name: "WiFi", icon: <Wifi size={20} />, available: true },
                { name: "Meals", icon: <Utensils size={20} />, available: true },
                { name: "Entertainment", icon: <Film size={20} />, available: true },
                { name: "Premium Drinks", icon: <Coffee size={20} />, available: false },
                { name: "Extra Legroom", icon: <Wind size={20} />, available: false }
            ];
        } else if (seatType.toLowerCase() === "business") {
            return [
                { name: "WiFi", icon: <Wifi size={20} />, available: true },
                { name: "Premium Meals", icon: <Utensils size={20} />, available: true },
                { name: "Entertainment", icon: <Film size={20} />, available: true },
                { name: "Premium Drinks", icon: <Coffee size={20} />, available: true },
                { name: "Extra Legroom", icon: <Wind size={20} />, available: true }
            ];
        } else { // First Class
            return [
                { name: "WiFi", icon: <Wifi size={20} />, available: true },
                { name: "Gourmet Meals", icon: <Utensils size={20} />, available: true },
                { name: "Premium Entertainment", icon: <Film size={20} />, available: true },
                { name: "Complimentary Bar", icon: <Coffee size={20} />, available: true },
                { name: "Luxury Space", icon: <Wind size={20} />, available: true },
                { name: "Private Bathroom", icon: <BathIcon size={20} />, available: true }
            ];
        }
    };

    return (
        <>
            <PassengerNavbar />
            <div className="seat-selection-container">
                <div className="flight-info">
                    <div className="flight-info-header">
                        <Plane size={28} className="flight-info-icon" />
                        <h2>Flight Details</h2>
                    </div>
                    
                    <h3 className="flight-name">{flight?.airplane?.name || "N/A"}</h3>
                    
                    <div className="flight-detail-item">
                        <MapPin size={18} className="detail-icon" />
                        <div>
                            <strong>From:</strong> {flight?.departureAirport?.name || "N/A"}
                        </div>
                    </div>
                    
                    <div className="flight-detail-item">
                        <MapPin size={18} className="detail-icon" />
                        <div>
                            <strong>To:</strong> {flight?.arrivalAirport?.name || "N/A"}
                        </div>
                    </div>
                    
                    <div className="flight-detail-item">
                        <Calendar size={18} className="detail-icon" />
                        <div>
                            <strong>Departure:</strong> {flight?.departureTime ? new Date(flight.departureTime).toLocaleDateString() : "N/A"}
                        </div>
                    </div>
                    
                    <div className="flight-detail-item">
                        <Clock size={18} className="detail-icon" />
                        <div>
                            <strong>Time:</strong> {flight?.departureTime ? new Date(flight.departureTime).toLocaleTimeString() : "N/A"}
                        </div>
                    </div>
                    
                    <div className="flight-detail-item">
                        <Calendar size={18} className="detail-icon" />
                        <div>
                            <strong>Arrival:</strong> {flight?.arrivalTime ? new Date(flight.arrivalTime).toLocaleDateString() : "N/A"}
                        </div>
                    </div>
                    
                    <div className="flight-detail-item">
                        <Clock size={18} className="detail-icon" />
                        <div>
                            <strong>Time:</strong> {flight?.arrivalTime ? new Date(flight.arrivalTime).toLocaleTimeString() : "N/A"}
                        </div>
                    </div>
                    
                    <div className="flight-detail-item">
                        <AlertCircle size={18} className="detail-icon" />
                        <div>
                            <strong>Status:</strong> <span className={`status-${flight?.flightStatus?.toLowerCase()}`}>{flight?.flightStatus || "N/A"}</span>
                        </div>
                    </div>
                    
                    <div className="section-divider"></div>
                    
                    <div className="flight-info-header">
                        <DollarSign size={24} className="flight-info-icon" />
                        <h3>Seat Pricing:</h3>
                    </div>
                    
                    <div className="pricing-container">
                        <div className="pricing-item economy-price">
                            <div className="seat-type-dot economy"></div>
                            <strong>Economy:</strong> ₹{flight?.economyFare}
                        </div>
                        <div className="pricing-item business-price">
                            <div className="seat-type-dot business"></div>
                            <strong>Business:</strong> ₹{flight?.businessFare}
                        </div>
                        <div className="pricing-item firstclass-price">
                            <div className="seat-type-dot firstclass"></div>
                            <strong>First Class:</strong> ₹{flight?.firstClassFare}
                        </div>
                    </div>
                    
                    {selectedSeats.length > 0 && (
                        <>
                            <div className="section-divider"></div>
                            <div className="amenities-section">
                                <h3>Amenities for {selectedSeats[0].seatType}</h3>
                                <div className="amenities-grid">
                                    {getAmenities(selectedSeats[0].seatType).map((amenity, index) => (
                                        <div key={index} className={`amenity-item ${!amenity.available ? 'amenity-unavailable' : ''}`}>
                                            {amenity.icon}
                                            <span>{amenity.name}</span>
                                            {!amenity.available && <span className="unavailable-text">Unavailable</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="seat-selection">
                    <h3>Select Your Seats</h3>
                    
                    <div className="seat-legend">
                        <div className="legend-item">
                            <div className="legend-box economy"></div>
                            <span>Economy</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-box business"></div>
                            <span>Business</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-box firstclass"></div>
                            <span>First Class</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-box booked"></div>
                            <span>Booked</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-box selected"></div>
                            <span>Selected</span>
                        </div>
                    </div>
                    
                    <div className="cabin-layout">
                        <div className="cabin-header">
                            <div className="cabin-exit left">EXIT</div>
                            <div className="aisle-label">FRONT</div>
                            <div className="cabin-exit right">EXIT</div>
                        </div>
                        
                        <div className="seats-grid">
                            {allSeats.length > 0 ? (
                                allSeats.map((seat) => (
                                    <div
                                        key={seat.seatNumber}
                                        className={`seat ${seat.isBooked ? "booked" : selectedSeats.find(s => s.seatNumber === seat.seatNumber) ? "selected" : (seat.seatType ? seat.seatType.replace(" ", "").toLowerCase() : "")}`}
                                        onClick={() => handleSeatSelect(seat)}
                                    >
                                        {seat.seatNumber}
                                    </div>
                                ))
                            ) : (
                                <p className="loading-text">Loading seats...</p>
                            )}
                        </div>
                        
                        <div className="cabin-footer">
                            <div className="cabin-exit left">EXIT</div>
                            <div className="aisle-label">REAR</div>
                            <div className="cabin-exit right">EXIT</div>
                        </div>
                    </div>
                    
                    <div className="selected-seats-summary">
                        <h4>Selected Seats: {selectedSeats.length > 0 ? 
                            selectedSeats.map(seat => seat.seatNumber).join(", ") : 
                            "None"}
                        </h4>
                        <div className="total-fare">
                            Total: <strong>₹{calculateTotalFare()}</strong>
                        </div>
                    </div>
                    
                    <button 
                        className="confirm-btn" 
                        onClick={handleProceedToPayment} 
                        disabled={selectedSeats.length === 0}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </>
    );
};

export default SeatSelection;