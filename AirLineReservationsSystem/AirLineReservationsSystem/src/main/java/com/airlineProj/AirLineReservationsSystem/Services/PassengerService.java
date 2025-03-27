package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Passenger;
import com.airlineProj.AirLineReservationsSystem.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class PassengerService {
    private static final Logger logger = LoggerFactory.getLogger(PassengerService.class);

    @Autowired
    private PassengerRepository passengerRepository;

    @Transactional
    public Passenger registerPassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }
}