package com.example.reservation_microservice.controller;

import com.example.reservation_microservice.model.Panier;
import com.example.reservation_microservice.model.PanierItem;
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

    // Nouvelle API pour obtenir la facture avec les informations du panier et de la réservation
    @GetMapping("/{id}/facture")
    public String getFacture(@PathVariable Long id) {
        Reservation reservation = reservationService.getReservation(id);

        Panier panier = reservation.getPanier();
        double total = panier.getTotal();
        StringBuilder factureDetails = new StringBuilder();

        // Détails du panier
        factureDetails.append("Panier:\n");
        for (PanierItem item : panier.getItems()) {  // Correction ici: appel à getItems() sur l'instance de Panier
            factureDetails.append("Article: ").append(item.getArticle().getName())
                    .append(", Quantité: ").append(item.getQuantity())
                    .append(", Prix Unitaire: ").append(item.getArticle().getPrice())
                    .append(", Total: ").append(item.getTotalPrice()).append("\n");
        }
        factureDetails.append("Prix Total du Panier: ").append(total).append("\n");

        // Détails de la réservation
        factureDetails.append("Réservation:\n");
        factureDetails.append("Date: ").append(reservation.getDate()).append("\n");
        factureDetails.append("Heure: ").append(reservation.getTime()).append("\n");
        factureDetails.append("Adresse: ").append(reservation.getAddress()).append("\n");

        return factureDetails.toString();
    }
}
