package com.example.reservation_microservice.controller;

import com.example.reservation_microservice.model.Article;
import com.example.reservation_microservice.model.Panier;
import com.example.reservation_microservice.service.PanierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/panier")
public class PanierController {

    @Autowired
    private PanierService panierService;

    // Création automatique d'un panier sans corps de requête
    @PostMapping
    public Panier createPanier() {
        Panier panier = new Panier();  // Crée un nouveau panier vide
        return panierService.savePanier(panier);
    }

    @GetMapping("/{id}")
    public Panier getPanier(@PathVariable Long id) {
        return panierService.getPanierById(id);
    }

    @PostMapping("/{id}/add")
    public Panier addArticleToPanier(@PathVariable Long id, @RequestBody Article article) {
        return panierService.addArticleToPanier(id, article);
    }

    @DeleteMapping("/{panierId}/remove/{articleId}")
    public Panier removeArticleFromPanier(@PathVariable Long panierId, @PathVariable Long articleId) {
        return panierService.removeArticleFromPanier(panierId, articleId);
    }
}
