package com.airlineProj.AirLineReservationsSystem.Repository;

import com.airlineProj.AirLineReservationsSystem.Entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {
}

