package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Flight;
import com.airlineProj.AirLineReservationsSystem.Services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/flights")
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{id}")
    public Optional<Flight> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id);
    }

    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        if (flight.getAirplane() == null || flight.getDepartureAirport() == null || flight.getArrivalAirport() == null) {
            throw new RuntimeException("Airplane, Departure Airport, and Arrival Airport must be provided!");
        }
        return flightService.addFlight(flight);
    }

    @PutMapping("/{id}")
    public Flight updateFlight(@PathVariable Long id, @RequestBody Flight flightDetails) {
        return flightService.updateFlight(id, flightDetails);
    }

    @GetMapping("/search")
    public List<Flight> getFlightsByRoute(@RequestParam Long from, @RequestParam Long to) {
        return flightService.findFlightsByRoute(from, to);
    }

    @DeleteMapping("/{id}")
    public String deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return "Flight deleted successfully!";
    }
}
