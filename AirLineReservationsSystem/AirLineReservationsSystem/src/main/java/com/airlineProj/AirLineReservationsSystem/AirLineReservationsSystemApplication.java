package com.airlineProj.AirLineReservationsSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.airlineProj.AirLineReservationsSystem.Repository")
public class AirLineReservationsSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(AirLineReservationsSystemApplication.class, args);
		System.out.println("Application Started");
	}
}
