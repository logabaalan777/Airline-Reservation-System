package com.airlineProj.AirLineReservationsSystem.Repository;

import com.airlineProj.AirLineReservationsSystem.Entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Airport findByAirportCode(String airportCode); // Find airport by its code
}
