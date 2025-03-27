package com.airlineProj.AirLineReservationsSystem.DTO;

public class BookingRequest {
    private Long passengerId;
    private Long flightId;
    private String seatType;
    private int numberOfPassengers;
    private double totalAmount;

    public BookingRequest() {}

    public BookingRequest(Long passengerId, Long flightId, String seatType, int numberOfPassengers, double totalAmount) {
        this.passengerId = passengerId;
        this.flightId = flightId;
        this.seatType = seatType;
        this.numberOfPassengers = numberOfPassengers;
        this.totalAmount = totalAmount;
    }

    public Long getPassengerId() { return passengerId; }
    public void setPassengerId(Long passengerId) { this.passengerId = passengerId; }

    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public int getNumberOfPassengers() { return numberOfPassengers; }
    public void setNumberOfPassengers(int numberOfPassengers) { this.numberOfPassengers = numberOfPassengers; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}
