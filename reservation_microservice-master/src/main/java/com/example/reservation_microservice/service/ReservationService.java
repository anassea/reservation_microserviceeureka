package com.example.reservation_microservice.service;

import com.example.reservation_microservice.model.Panier;
import com.example.reservation_microservice.model.Reservation;
import com.example.reservation_microservice.repository.PanierRepository;
import com.example.reservation_microservice.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private PanierRepository panierRepository;

    // Créer une réservation vide
    public Reservation createEmptyReservation() {
        Reservation reservation = new Reservation();
        return reservationRepository.save(reservation);
    }

    // Ajouter des informations à une réservation
    public Reservation updateReservationInfo(Long reservationId, Long panierId, String address, String date, String time) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));

        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        reservation.setPanier(panier);
        reservation.setAddress(address);
        reservation.setDate(date);
        reservation.setTime(time);

        return reservationRepository.save(reservation);
    }

    // Récupérer une réservation par ID
    public Reservation getReservation(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));
    }
}
