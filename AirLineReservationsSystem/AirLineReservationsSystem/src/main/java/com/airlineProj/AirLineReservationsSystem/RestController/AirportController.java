package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Airport;
import com.airlineProj.AirLineReservationsSystem.Services.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/airports")
@CrossOrigin(origins = "http://localhost:3000")
public class AirportController {

    @Autowired
    private AirportService airportService;

    // Add new airport
    @PostMapping
    public ResponseEntity<Airport> addAirport(@RequestBody Airport airport) {
        return ResponseEntity.ok(airportService.addAirport(airport));
    }

    // Get all airports
    @GetMapping
    public ResponseEntity<List<Airport>> getAllAirports() {
        return ResponseEntity.ok(airportService.getAllAirports());
    }

    // Get airport by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Airport>> getAirportById(@PathVariable Long id) {
        return ResponseEntity.ok(airportService.getAirportById(id));
    }

    // Delete airport by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAirport(@PathVariable Long id) {
        airportService.deleteAirport(id);
        return ResponseEntity.ok("Airport deleted successfully");
    }
}
