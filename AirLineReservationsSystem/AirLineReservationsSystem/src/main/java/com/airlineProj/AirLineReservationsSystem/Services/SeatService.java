package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Seat;
import com.airlineProj.AirLineReservationsSystem.Entity.Flight;
import com.airlineProj.AirLineReservationsSystem.Repository.FlightRepository;
import com.airlineProj.AirLineReservationsSystem.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.IntStream;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private FlightRepository flightRepository;

    public List<Seat> getSeatsByFlight(Long flightId) {
        return seatRepository.findByFlightId(flightId);
    }

    public List<Seat> createSeats(Long flightId, int economySeats, int businessSeats, int firstClassSeats) {
        Optional<Flight> flightOpt = flightRepository.findById(flightId);
        if (flightOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found");
        }
        Flight flight = flightOpt.get();
        List<Seat> newSeats = new ArrayList<>();

        // Create Economy seats
        IntStream.range(1, economySeats + 1).forEach(i ->
                newSeats.add(new Seat(flight, "E" + i, "Economy", false)));

        // Create Business seats
        IntStream.range(1, businessSeats + 1).forEach(i ->
                newSeats.add(new Seat(flight, "B" + i, "Business", false)));

        // Create First Class seats
        IntStream.range(1, firstClassSeats + 1).forEach(i ->
                newSeats.add(new Seat(flight, "F" + i, "First Class", false)));

        return seatRepository.saveAll(newSeats);
    }

    public List<Seat> bookSeats(Long flightId, List<String> seatNumbers) {
        Optional<Flight> flightOpt = flightRepository.findById(flightId);
        if (flightOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found");
        }
        Flight flight = flightOpt.get();

        List<Seat> seatsToBook = seatRepository.findByFlightId(flightId)
                .stream()
                .filter(seat -> seatNumbers.contains(seat.getSeatNumber()) && !seat.isBooked())
                .toList();

        if (seatsToBook.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No available seats found for booking.");
        }

        seatsToBook.forEach(seat -> seat.setBooked(true));
        return seatRepository.saveAll(seatsToBook);
    }
}
