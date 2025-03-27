package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Airplane;
import com.airlineProj.AirLineReservationsSystem.Services.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/airplanes")
@CrossOrigin(origins = "http://localhost:3000")
public class AirplaneController {

    @Autowired
    private AirplaneService airplaneService;

    // Add new airplane
    @PostMapping
    public ResponseEntity<Airplane> addAirplane(@RequestBody Airplane airplane) {
        return ResponseEntity.ok(airplaneService.addAirplane(airplane));
    }

    // Get all airplanes
    @GetMapping
    public ResponseEntity<List<Airplane>> getAllAirplanes() {
        return ResponseEntity.ok(airplaneService.getAllAirplanes());
    }

    // Get airplane by ID
    @GetMapping("/{id}")
    public ResponseEntity<Airplane> getAirplaneById(@PathVariable Long id) {
        Optional<Airplane> airplane = airplaneService.getAirplaneById(id);
        return airplane.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update airplane by ID
    @PutMapping("/{id}")
    public ResponseEntity<Airplane> updateAirplane(@PathVariable Long id, @RequestBody Airplane updatedAirplane) {
        Airplane airplane = airplaneService.updateAirplane(id, updatedAirplane);
        return ResponseEntity.ok(airplane);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAirplane(@PathVariable Long id) {
        try {
            boolean isDeleted = airplaneService.deleteAirplane(id);
            return ResponseEntity.ok("Airplane deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
