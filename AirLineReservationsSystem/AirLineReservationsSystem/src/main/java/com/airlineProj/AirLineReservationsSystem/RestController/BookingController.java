package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Booking;
import com.airlineProj.AirLineReservationsSystem.DTO.BookingRequest;
import com.airlineProj.AirLineReservationsSystem.Services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        System.out.println("📌 Retrieved Bookings from DB: " + bookings);
        return bookings;
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            System.out.println("📌 Received Booking Request: " + request);
            Booking savedBooking = bookingService.createBooking(request);
            return ResponseEntity.ok(savedBooking);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error: " + e.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing booking: " + e.getMessage());
        }
    }

    @GetMapping("/flight/{flightId}")
    public List<Booking> getBookingsByFlightId(@PathVariable Long flightId) {
        return bookingService.getBookingsByFlightId(flightId);
    }

    @GetMapping("/passenger/{passengerId}")
    public List<Booking> getBookingsByPassengerId(@PathVariable Long passengerId) {
        return bookingService.getBookingsByPassengerId(passengerId);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}
