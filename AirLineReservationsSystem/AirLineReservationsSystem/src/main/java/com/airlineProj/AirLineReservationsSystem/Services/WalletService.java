package com.airlineProj.AirLineReservationsSystem.Services;

import com.airlineProj.AirLineReservationsSystem.Entity.Wallet;
import com.airlineProj.AirLineReservationsSystem.Entity.Passenger;
import com.airlineProj.AirLineReservationsSystem.Repository.WalletRepository;
import com.airlineProj.AirLineReservationsSystem.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    // Get Wallet by Passenger ID
    public Optional<Wallet> getWalletByPassengerId(Long passengerId) {
        return walletRepository.findByPassengerId(passengerId);
    }

    // Create Wallet
// In WalletService.java
    public Wallet getOrCreateWallet(Long passengerId) {
        return walletRepository.findByPassengerId(passengerId)
                .orElseGet(() -> {
                    Passenger passenger = passengerRepository.findById(passengerId)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Passenger not found"));

                    Wallet newWallet = new Wallet();
                    newWallet.setPassenger(passenger);
                    newWallet.setBalance(0.0);
                    return walletRepository.save(newWallet);
                });
    }

    @Transactional
    public Wallet addMoney(Long passengerId, double amount) {
        try {
            Wallet wallet = walletRepository.findByPassengerId(passengerId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found"));

            wallet.setBalance(wallet.getBalance() + amount);
            return walletRepository.save(wallet);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing wallet transaction", e);
        }
    }

    // Deduct Money from Wallet
    @Transactional
    public Wallet deductMoney(Long passengerId, double amount) {
        if (amount <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount must be greater than zero.");
        }

        Wallet wallet = walletRepository.findByPassengerId(passengerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found for passenger ID: " + passengerId));

        if (wallet.getBalance() < amount) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient balance! Current balance: " + wallet.getBalance());
        }

        wallet.setBalance(wallet.getBalance() - amount);
        return walletRepository.save(wallet);
    }

    // Delete Wallet
    public void deleteWallet(Long id) {
        walletRepository.deleteById(id);
    }
}
