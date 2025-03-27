package com.airlineProj.AirLineReservationsSystem.Repository;

import com.airlineProj.AirLineReservationsSystem.Entity.Flight;
import com.airlineProj.AirLineReservationsSystem.Entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightId(Long flightId);
    Optional<Seat> findByFlightIdAndSeatNumber(Long flightId, String seatNumber);
    boolean existsByFlightIdAndSeatNumber(Long flightId, String seatNumber);
    Optional<Seat> findByFlightAndSeatNumber(Flight flight, String seatNumber);
}
