package com.airlineProj.AirLineReservationsSystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "wallet")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;

    @Column(nullable = false)
    private double balance;

    public Wallet() {}

    public Wallet(Passenger passenger, double balance) {
        this.passenger = passenger;
        this.balance = balance;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Passenger getPassenger() { return passenger; }
    public void setPassenger(Passenger passenger) { this.passenger = passenger; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}
