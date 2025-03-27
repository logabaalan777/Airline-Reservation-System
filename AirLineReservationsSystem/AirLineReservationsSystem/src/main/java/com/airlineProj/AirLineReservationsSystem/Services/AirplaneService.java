package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Airplane;
import com.airlineProj.AirLineReservationsSystem.Repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirplaneService {

    @Autowired
    private AirplaneRepository airplaneRepository;

    // Add new airplane
    public Airplane addAirplane(Airplane airplane) {
        return airplaneRepository.save(airplane);
    }

    // Get all airplanes
    public List<Airplane> getAllAirplanes() {
        return airplaneRepository.findAll();
    }

    // Get airplane by ID
    public Optional<Airplane> getAirplaneById(Long id) {
        return airplaneRepository.findById(id);
    }

    // Update airplane
    public Airplane updateAirplane(Long id, Airplane updatedAirplane) {
        return airplaneRepository.findById(id).map(airplane -> {
            airplane.setName(updatedAirplane.getName());
            airplane.setPlaneNo(updatedAirplane.getPlaneNo());
            airplane.setDescription(updatedAirplane.getDescription());
            airplane.setTotalSeats(updatedAirplane.getTotalSeats());
            airplane.setEconomySeats(updatedAirplane.getEconomySeats());
            airplane.setBusinessSeats(updatedAirplane.getBusinessSeats());
            airplane.setFirstClassSeats(updatedAirplane.getFirstClassSeats());
            return airplaneRepository.save(airplane);
        }).orElseThrow(() -> new RuntimeException("Airplane not found"));
    }

    // Delete airplane by ID
    public boolean deleteAirplane(Long id) {
        if (airplaneRepository.existsById(id)) {
            airplaneRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Airplane with ID " + id + " not found");
        }
    }
}
