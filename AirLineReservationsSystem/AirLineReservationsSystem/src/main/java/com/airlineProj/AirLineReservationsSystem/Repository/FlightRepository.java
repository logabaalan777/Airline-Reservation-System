package com.airlineProj.AirLineReservationsSystem.Repository;

import com.airlineProj.AirLineReservationsSystem.Entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByFlightStatus(String flightStatus);
    @Query("SELECT f FROM Flight f JOIN FETCH f.departureAirport JOIN FETCH f.arrivalAirport WHERE f.departureAirport.id = :from AND f.arrivalAirport.id = :to")
    List<Flight> findByDepartureAirportAndArrivalAirport(@Param("from") Long from, @Param("to") Long to);
}
