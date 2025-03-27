package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Airplane;
import com.airlineProj.AirLineReservationsSystem.Entity.Airport;
import com.airlineProj.AirLineReservationsSystem.Entity.Flight;
import com.airlineProj.AirLineReservationsSystem.Entity.Seat;
import com.airlineProj.AirLineReservationsSystem.Repository.AirplaneRepository;
import com.airlineProj.AirLineReservationsSystem.Repository.AirportRepository;
import com.airlineProj.AirLineReservationsSystem.Repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    private final FlightRepository flightRepository;
    private final AirplaneRepository airplaneRepository;
    private final AirportRepository airportRepository;
    private final SeatService seatService;  // Inject SeatService

    public FlightService(FlightRepository flightRepository,
                         AirplaneRepository airplaneRepository,
                         AirportRepository airportRepository,
                         SeatService seatService) { // Inject SeatService
        this.flightRepository = flightRepository;
        this.airplaneRepository = airplaneRepository;
        this.airportRepository = airportRepository;
        this.seatService = seatService;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }


    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    public List<Flight> findFlightsByRoute(Long from, Long to) {
        return flightRepository.findByDepartureAirportAndArrivalAirport(from, to);
    }

    public Flight addFlight(Flight flight) {
        Long airplaneId = flight.getAirplane().getId();
        Long departureAirportId = flight.getDepartureAirport().getId();
        Long arrivalAirportId = flight.getArrivalAirport().getId();

        Airplane airplane = airplaneRepository.findById(airplaneId)
                .orElseThrow(() -> new RuntimeException("Airplane not found"));
        Airport departureAirport = airportRepository.findById(departureAirportId)
                .orElseThrow(() -> new RuntimeException("Departure Airport not found"));
        Airport arrivalAirport = airportRepository.findById(arrivalAirportId)
                .orElseThrow(() -> new RuntimeException("Arrival Airport not found"));

        flight.setAirplane(airplane);
        flight.setDepartureAirport(departureAirport);
        flight.setArrivalAirport(arrivalAirport);

        // Save flight in DB
        Flight savedFlight = flightRepository.save(flight);

        // Automatically create seats based on airplane capacity
        seatService.createSeats(
                savedFlight.getId(),
                airplane.getEconomySeats(),
                airplane.getBusinessSeats(),
                airplane.getFirstClassSeats()
        );

        return savedFlight;
    }

    public Flight updateFlight(Long id, Flight flightDetails) {
        return flightRepository.findById(id).map(flight -> {
            flight.setAirplane(flightDetails.getAirplane());
            flight.setDepartureAirport(flightDetails.getDepartureAirport());
            flight.setArrivalAirport(flightDetails.getArrivalAirport());
            flight.setDepartureTime(flightDetails.getDepartureTime());
            flight.setArrivalTime(flightDetails.getArrivalTime());
            flight.setFlightStatus(flightDetails.getFlightStatus());
            flight.setEconomyFare(flightDetails.getEconomyFare());
            flight.setBusinessFare(flightDetails.getBusinessFare());
            flight.setFirstClassFare(flightDetails.getFirstClassFare());
            return flightRepository.save(flight);
        }).orElseThrow(() -> new RuntimeException("Flight not found with id " + id));
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
