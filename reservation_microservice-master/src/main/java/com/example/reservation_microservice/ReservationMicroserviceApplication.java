package com.example.reservation_microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.reservation_microservice.repository")
@EntityScan(basePackages = "com.example.reservation_microservice.model") // Remplacez `entity` par `model` si vous utilisez ce nom.
public class ReservationMicroserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReservationMicroserviceApplication.class, args);
    }
}