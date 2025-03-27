package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Airport;
import com.airlineProj.AirLineReservationsSystem.Repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    // Add new airport
    public Airport addAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    // Get all airports
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    // Get airport by ID
    public Optional<Airport> getAirportById(Long id) {
        return airportRepository.findById(id);
    }

    // Delete airport by ID
    public void deleteAirport(Long id) {
        airportRepository.deleteById(id);
    }
}
