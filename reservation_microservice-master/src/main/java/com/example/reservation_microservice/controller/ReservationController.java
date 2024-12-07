package com.example.reservation_microservice.controller;

import com.example.reservation_microservice.model.Reservation;
import com.example.reservation_microservice.model.ReservationInfoRequest;
import com.example.reservation_microservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // Créer une réservation vide
    @PostMapping
    public Reservation createReservation() {
        return reservationService.createEmptyReservation();
    }

    // Ajouter les informations de réservation
    @PutMapping("/info")
    public Reservation addReservationInfo(@RequestBody ReservationInfoRequest request) {
        return reservationService.updateReservationInfo(
                request.getReservationId(),
                request.getPanierId(),
                request.getAddress(),
                request.getDate(),
                request.getTime()
        );
    }


    // Récupérer toutes les informations d'une réservation par ID
    @GetMapping("/{id}")
    public Reservation getReservation(@PathVariable Long id) {
        return reservationService.getReservation(id);
    }
}
