package com.airlineProj.AirLineReservationsSystem.DTO;

import java.util.List;

public class SeatBookingRequest {
    private Long flightId;
    private List<String> seatNumbers;

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public List<String> getSeatNumbers() {
        return seatNumbers;
    }

    public void setSeatNumbers(List<String> seatNumbers) {
        this.seatNumbers = seatNumbers;
    }
}
