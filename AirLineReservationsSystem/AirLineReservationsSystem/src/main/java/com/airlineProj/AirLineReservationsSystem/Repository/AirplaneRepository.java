package com.airlineProj.AirLineReservationsSystem.Repository;

import com.airlineProj.AirLineReservationsSystem.Entity.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirplaneRepository extends JpaRepository<Airplane, Long> {
    Airplane findByPlaneNo(String planeNo); // Custom query to find airplane by plane number
}
