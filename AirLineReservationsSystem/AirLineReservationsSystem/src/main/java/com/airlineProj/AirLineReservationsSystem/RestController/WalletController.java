package com.airlineProj.AirLineReservationsSystem.RestController;

import com.airlineProj.AirLineReservationsSystem.Entity.Wallet;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.airlineProj.AirLineReservationsSystem.Services.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/wallets")
@CrossOrigin(origins = "http://localhost:3000")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/{passengerId}")
    public Wallet getWalletByPassengerId(@PathVariable Long passengerId) {
        return walletService.getOrCreateWallet(passengerId);
    }

    // Create Wallet for Passenger
    @PostMapping
    public Wallet createWallet(@RequestBody Wallet wallet) {
        return walletService.getOrCreateWallet(wallet.getId());
    }

    public static class AddMoneyRequest {
        private double amount;
        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
    }

    @PutMapping("/addMoney/{passengerId}")
    public Wallet addMoney(@PathVariable Long passengerId, @RequestBody AddMoneyRequest request) {
        if (request.amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }
        if (request.amount > 50000) {
            throw new IllegalArgumentException("Maximum limit per transaction is ₹50,000.");
        }
        return walletService.addMoney(passengerId, request.amount);
    }

    // Deduct Money from Wallet (Should not become negative)
    @PutMapping("/deductMoney/{passengerId}")
    public Wallet deductMoney(@PathVariable Long passengerId, @RequestBody AddMoneyRequest request) {
        if (request.amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }

        // Get wallet safely
        Wallet wallet = walletService.getWalletByPassengerId(passengerId)
                .orElseThrow(() -> new IllegalArgumentException("❌ Wallet not found for passenger ID: " + passengerId));

        // Check for sufficient balance
        if (wallet.getBalance() < request.amount) {
            throw new IllegalArgumentException("❌ Insufficient balance.");
        }

        // Deduct money and return updated wallet
        return walletService.deductMoney(passengerId, request.amount);
    }

    // Delete Wallet
    @DeleteMapping("/{id}")
    public String deleteWallet(@PathVariable Long id) {
        walletService.deleteWallet(id);
        return "Wallet deleted successfully!";
    }
}
