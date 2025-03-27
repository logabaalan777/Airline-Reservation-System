package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Seat;
import com.airlineProj.AirLineReservationsSystem.DTO.SeatBookingRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.airlineProj.AirLineReservationsSystem.Services.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @GetMapping("/flight/{flightId}")
    public List<Seat> getSeatsByFlight(@PathVariable Long flightId) {
        System.out.println("Fetching seats for flight ID: " + flightId);

        List<Seat> seats = seatService.getSeatsByFlight(flightId);

        if (seats.isEmpty()) {
            System.out.println("❌ No seats found for flight ID: " + flightId);
        } else {
            System.out.println("✅ Seats retrieved: " + seats.size());
        }

        return seats;
    }

    // Create seats dynamically for a flight
    @PostMapping("/create")
    public List<Seat> createSeats(@RequestParam Long flightId,
                                  @RequestParam int economySeats,
                                  @RequestParam int businessSeats,
                                  @RequestParam int firstClassSeats) {
        return seatService.createSeats(flightId, economySeats, businessSeats, firstClassSeats);
    }

    // Book seats
    @PutMapping("/bookings")
    public List<Seat> bookSeats(@RequestBody SeatBookingRequest requestDTO) {
        return seatService.bookSeats(requestDTO.getFlightId(), requestDTO.getSeatNumbers());
    }
}
