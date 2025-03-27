package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Payment;
import com.airlineProj.AirLineReservationsSystem.DTO.PaymentRequest;
import com.airlineProj.AirLineReservationsSystem.Services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Get all payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get a payment by ID
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    // Get payments for a specific booking
    @GetMapping("/booking/{bookingId}")
    public List<Payment> getPaymentsByBooking(@PathVariable Long bookingId) {
        return paymentService.getPaymentsByBooking(bookingId);
    }

    // Create a new payment
    @PostMapping
    public Payment createPayment(@RequestBody PaymentRequest paymentRequest) {
        return paymentService.createPayment(
                paymentRequest.getBookingId(),
                paymentRequest.getAmount(),
                paymentRequest.getPaymentMethod(),
                paymentRequest.getPaymentStatus()
        );
    }
}
