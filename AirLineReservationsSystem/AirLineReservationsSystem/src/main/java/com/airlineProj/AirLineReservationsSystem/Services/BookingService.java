//package com.airlineProj.AirLineReservationsSystem.Services;
//
//import com.airlineProj.AirLineReservationsSystem.Entity.*;
//import com.airlineProj.AirLineReservationsSystem.DTO.BookingRequest;
//import com.airlineProj.AirLineReservationsSystem.Repository.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.util.Date;
//import java.util.List;
//
//@Service
//public class BookingService {
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @Autowired
//    private PassengerRepository passengerRepository;
//
//    @Autowired
//    private FlightRepository flightRepository;
//
//    @Autowired
//    private WalletRepository walletRepository;
//
//    public List<Booking> getAllBookings() {
//        return bookingRepository.findAll();
//    }
//
//    public Booking getBookingById(Long id) {
//        return bookingRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID: " + id));
//    }
//
//    @Transactional
//    public Booking createBooking(BookingRequest request) {
//        Passenger passenger = passengerRepository.findById(request.getPassengerId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Passenger not found with ID: " + request.getPassengerId()));
//
//        Flight flight = flightRepository.findById(request.getFlightId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found with ID: " + request.getFlightId()));
//
//        Wallet wallet = walletRepository.findByPassenger(passenger)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found for Passenger ID: " + request.getPassengerId()));
//
//        // Determine seat price based on seat type
//        double seatPrice;
//        switch (request.getSeatType().toLowerCase()) {
//            case "economy":
//                seatPrice = flight.getEconomyFare();
//                break;
//            case "business":
//                seatPrice = flight.getBusinessFare();
//                break;
//            case "first class":
//                seatPrice = flight.getFirstClassFare();
//                break;
//            default:
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid seat type: " + request.getSeatType());
//        }
//
//        // Calculate total cost
//        double totalAmount = seatPrice * request.getNumberOfPassengers();
//
//        // Check if passenger wallet has enough balance
//        if (wallet.getBalance() < totalAmount) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance in wallet");
//        }
//
//        // Deduct amount from wallet
//        wallet.setBalance(wallet.getBalance() - totalAmount);
//        walletRepository.save(wallet);
//
//        // Create booking
//        Booking booking = new Booking(passenger, flight, request.getSeatType(), request.getNumberOfPassengers(), totalAmount, new Date(), "Confirmed");
//        return bookingRepository.save(booking);
//    }
//
//    public List<Booking> getBookingsByFlightId(Long flightId) {
//        return bookingRepository.findByFlightId(flightId);
//    }
//
//    public List<Booking> getBookingsByPassengerId(Long passengerId) {
//        return bookingRepository.findByPassengerId(passengerId);
//    }
//
//    public void deleteBooking(Long id) {
//        if (!bookingRepository.existsById(id)) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID: " + id);
//        }
//        bookingRepository.deleteById(id);
//    }
//}

package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.*;
import com.airlineProj.AirLineReservationsSystem.DTO.BookingRequest;
import com.airlineProj.AirLineReservationsSystem.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private WalletRepository walletRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID: " + id));
    }

    @Transactional
    public Booking createBooking(BookingRequest request) {
        try {
            System.out.println("📌 Booking Request Received: " + request);
            System.out.println("📌 Passenger ID: " + request.getPassengerId());
            System.out.println("📌 Flight ID: " + request.getFlightId());
            System.out.println("📌 Seat Type: " + request.getSeatType());
            System.out.println("📌 Passengers: " + request.getNumberOfPassengers());
            System.out.println("📌 Total Amount: " + request.getTotalAmount());

            // Validate Passenger
            Passenger passenger = passengerRepository.findById(request.getPassengerId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Passenger not found"));

            // Validate Flight
            Flight flight = flightRepository.findById(request.getFlightId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found"));

            // Validate Wallet
            Wallet wallet = walletRepository.findByPassenger(passenger)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found"));

            // Validate Seat Type
            double seatPrice;
            switch (request.getSeatType().toLowerCase()) {
                case "economy":
                    seatPrice = flight.getEconomyFare();
                    break;
                case "business":
                    seatPrice = flight.getBusinessFare();
                    break;
                case "first class":
                    seatPrice = flight.getFirstClassFare();
                    break;
                default:
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid seat type");
            }

            // Check Balance
            double totalCost = seatPrice * request.getNumberOfPassengers();
            if (wallet.getBalance() < totalCost) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance");
            }

            // Deduct from Wallet
            wallet.setBalance(wallet.getBalance() - totalCost);
            walletRepository.save(wallet);

            // Create Booking
            Booking booking = new Booking(passenger, flight, request.getSeatType(), request.getNumberOfPassengers(), totalCost, new Date(), "Confirmed");
            Booking savedBooking = bookingRepository.save(booking);

            System.out.println("✅ Booking Created: " + savedBooking.getId());
            return savedBooking;

        } catch (Exception e) {
            System.err.println("❌ Error Creating Booking: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Booking creation failed: " + e.getMessage());
        }
    }

    public List<Booking> getBookingsByFlightId(Long flightId) {
        return bookingRepository.findByFlightId(flightId);
    }

    public List<Booking> getBookingsByPassengerId(Long passengerId) {
        return bookingRepository.findByPassengerId(passengerId);
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID: " + id);
        }
        bookingRepository.deleteById(id);
    }
}

