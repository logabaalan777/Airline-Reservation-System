package com.airlineProj.AirLineReservationsSystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "airport")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(unique = true, nullable = false, length = 10)
    private String airportCode;

    @Column(nullable = false, length = 255)
    private String address;

    public Airport() {}

    public Airport(String name, String location, String airportCode, String address) {
        this.name = name;
        this.location = location;
        this.airportCode = airportCode;
        this.address = address;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getAirportCode() { return airportCode; }
    public void setAirportCode(String airportCode) { this.airportCode = airportCode; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
