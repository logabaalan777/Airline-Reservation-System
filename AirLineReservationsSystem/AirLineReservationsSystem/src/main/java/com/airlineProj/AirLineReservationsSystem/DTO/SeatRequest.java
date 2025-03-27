package com.airlineProj.AirLineReservationsSystem.DTO;

import java.util.List;

public class SeatRequest {
    private Long flightId;
    private int economySeats;
    private int businessSeats;
    private int firstClassSeats;
    private List<String> seatNumbers;
    private List<String> seatTypes;

    // Default Constructor
    public SeatRequest() {
    }

    // Parameterized Constructor
    public SeatRequest(Long flightId, int economySeats, int businessSeats, int firstClassSeats, List<String> seatNumbers, List<String> seatTypes) {
        this.flightId = flightId;
        this.economySeats = economySeats;
        this.businessSeats = businessSeats;
        this.firstClassSeats = firstClassSeats;
        this.seatNumbers = seatNumbers;
        this.seatTypes = seatTypes;
    }

    // Getters and Setters
    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public int getEconomySeats() {
        return economySeats;
    }

    public void setEconomySeats(int economySeats) {
        this.economySeats = economySeats;
    }

    public int getBusinessSeats() {
        return businessSeats;
    }

    public void setBusinessSeats(int businessSeats) {
        this.businessSeats = businessSeats;
    }

    public int getFirstClassSeats() {
        return firstClassSeats;
    }

    public void setFirstClassSeats(int firstClassSeats) {
        this.firstClassSeats = firstClassSeats;
    }

    public List<String> getSeatNumbers() {
        return seatNumbers;
    }

    public void setSeatNumbers(List<String> seatNumbers) {
        this.seatNumbers = seatNumbers;
    }

    public List<String> getSeatTypes() {
        return seatTypes;
    }

    public void setSeatTypes(List<String> seatTypes) {
        this.seatTypes = seatTypes;
    }

    @Override
    public String toString() {
        return "SeatRequest{" +
                "flightId=" + flightId +
                ", economySeats=" + economySeats +
                ", businessSeats=" + businessSeats +
                ", firstClassSeats=" + firstClassSeats +
                ", seatNumbers=" + seatNumbers +
                ", seatTypes=" + seatTypes +
                '}';
    }
}
