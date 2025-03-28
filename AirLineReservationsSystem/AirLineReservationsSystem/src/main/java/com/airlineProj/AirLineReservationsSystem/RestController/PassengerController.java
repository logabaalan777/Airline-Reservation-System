package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Passenger;
import com.airlineProj.AirLineReservationsSystem.Services.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
@CrossOrigin(origins = "http://localhost:3000")
public class PassengerController {
    @Autowired
    private PassengerService passengerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPassenger(@RequestBody Passenger passenger) {
        try {
            Passenger savedPassenger = passengerService.registerPassenger(passenger);
            return ResponseEntity.ok(savedPassenger);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering passenger: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Passenger>> getAllPassengers() {
        return ResponseEntity.ok(passengerService.getAllPassengers());
    }
}
