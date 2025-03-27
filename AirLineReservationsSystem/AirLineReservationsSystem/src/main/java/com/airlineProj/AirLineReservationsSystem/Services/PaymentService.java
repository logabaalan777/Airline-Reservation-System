package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Payment;
import com.airlineProj.AirLineReservationsSystem.Entity.Booking;
import com.airlineProj.AirLineReservationsSystem.Repository.PaymentRepository;
import com.airlineProj.AirLineReservationsSystem.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by ID
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found with ID: " + id));
    }

    // Get payments for a specific booking
    public List<Payment> getPaymentsByBooking(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    // Create a new payment
    public Payment createPayment(Long bookingId, double amount, String paymentMethod, String paymentStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found with ID: " + bookingId));

        Payment payment = new Payment(booking, amount, paymentMethod, paymentStatus, new Date());
        return paymentRepository.save(payment);
    }
}
