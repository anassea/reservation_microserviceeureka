package com.example.reservation_microservice.repository;

import com.example.reservation_microservice.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PanierRepository extends JpaRepository<Panier, Long> {
    // Aucune méthode supplémentaire n'est nécessaire pour le moment
    // Les méthodes CRUD standard (save, findById, delete, etc.) sont héritées de JpaRepository
}