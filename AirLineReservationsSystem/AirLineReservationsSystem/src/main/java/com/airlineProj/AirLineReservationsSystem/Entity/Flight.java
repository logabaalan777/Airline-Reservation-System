package com.airlineProj.AirLineReservationsSystem.Entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.Date;

@Entity
@Table(name = "flight")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "airplane_id", nullable = false)
    private Airplane airplane;

    @ManyToOne
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport;

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date departureTime;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date arrivalTime;

    @Column(nullable = false, length = 20)
    private String flightStatus; // Scheduled, On-Time, Delayed, Cancelled

    @Column(nullable = false)
    private double economyFare;

    @Column(nullable = false)
    private double businessFare;

    @Column(nullable = false)
    private double firstClassFare;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<Seat> seats;

    public Flight() {}

    public Flight(Airplane airplane, Airport departureAirport, Airport arrivalAirport, Date departureTime, Date arrivalTime, String flightStatus, double economyFare, double businessFare, double firstClassFare) {
        this.airplane = airplane;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.flightStatus = flightStatus;
        this.economyFare = economyFare;
        this.businessFare = businessFare;
        this.firstClassFare = firstClassFare;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Airplane getAirplane() { return airplane; }
    public void setAirplane(Airplane airplane) { this.airplane = airplane; }

    public Airport getDepartureAirport() { return departureAirport; }
    public void setDepartureAirport(Airport departureAirport) { this.departureAirport = departureAirport; }

    public Airport getArrivalAirport() { return arrivalAirport; }
    public void setArrivalAirport(Airport arrivalAirport) { this.arrivalAirport = arrivalAirport; }

    public Date getDepartureTime() { return departureTime; }
    public void setDepartureTime(Date departureTime) { this.departureTime = departureTime; }

    public Date getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(Date arrivalTime) { this.arrivalTime = arrivalTime; }

    public String getFlightStatus() { return flightStatus; }
    public void setFlightStatus(String flightStatus) { this.flightStatus = flightStatus; }

    public double getEconomyFare() { return economyFare; }
    public void setEconomyFare(double economyFare) { this.economyFare = economyFare; }

    public double getBusinessFare() { return businessFare; }
    public void setBusinessFare(double businessFare) { this.businessFare = businessFare; }

    public double getFirstClassFare() { return firstClassFare; }
    public void setFirstClassFare(double firstClassFare) { this.firstClassFare = firstClassFare; }
}

