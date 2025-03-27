package com.airlineProj.AirLineReservationsSystem.Entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE) // Ensures existing passengers are updated, not duplicated
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(nullable = false)
    private String seatType;

    @Column(nullable = false)
    private int numberOfPassengers;

    @Column(nullable = false)
    private double totalAmount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date bookingDate = new Date(); // Auto-assign date

    @Column(nullable = false)
    private String status = "Confirmed"; // Default status

    public Booking() {}

    public Booking(Passenger passenger, Flight flight, String seatType, int numberOfPassengers, double totalAmount, Date bookingDate, String status) {
        this.passenger = passenger;
        this.flight = flight;
        this.seatType = seatType;
        this.numberOfPassengers = numberOfPassengers;
        this.totalAmount = totalAmount;
        this.bookingDate = bookingDate != null ? bookingDate : new Date();
        this.status = status != null ? status : "Confirmed";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Passenger getPassenger() { return passenger; }
    public void setPassenger(Passenger passenger) { this.passenger = passenger; }

    public Flight getFlight() { return flight; }
    public void setFlight(Flight flight) { this.flight = flight; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public int getNumberOfPassengers() { return numberOfPassengers; }
    public void setNumberOfPassengers(int numberOfPassengers) { this.numberOfPassengers = numberOfPassengers; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public Date getBookingDate() { return bookingDate; }
    public void setBookingDate(Date bookingDate) { this.bookingDate = bookingDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
