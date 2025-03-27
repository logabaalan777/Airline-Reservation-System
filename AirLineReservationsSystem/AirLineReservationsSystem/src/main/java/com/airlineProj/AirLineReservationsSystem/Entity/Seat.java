package com.airlineProj.AirLineReservationsSystem.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    @JsonIgnore  // Prevent infinite recursion
    private Flight flight;

    @Column(nullable = false, length = 5)
    private String seatNumber;

    @Column(nullable = false, length = 20)
    private String seatType; // Economy, Business, First Class

    @Column(nullable = false)
    private boolean isBooked = false;

    public Seat() {}

    public Seat(Flight flight, String seatNumber, String seatType, boolean isBooked) {
        this.flight = flight;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.isBooked = isBooked;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Flight getFlight() { return flight; }
    public void setFlight(Flight flight) { this.flight = flight; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public boolean isBooked() { return isBooked; }
    public void setBooked(boolean isBooked) { this.isBooked = isBooked; }
}
