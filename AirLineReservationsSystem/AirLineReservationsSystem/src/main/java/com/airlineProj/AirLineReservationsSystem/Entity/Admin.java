package com.airlineProj.AirLineReservationsSystem.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin extends User {

    public Admin() {
        // Set default role in the default constructor
        setRole("ADMIN");
    }

    public Admin(String name, String email, String password) {
        // Ensure the role is set in the parameterized constructor
        super(name, email, password, "ADMIN");
    }
}