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

    @PostMapping
    public Panier createPanier() {
        return panierService.savePanier(new Panier());
    }

    @GetMapping("/{id}")
    public Panier getPanier(@PathVariable Long id) {
        return panierService.getPanierById(id);
    }

    @PostMapping("/{id}/add")
    public Panier addArticleToPanier(@PathVariable Long id, @RequestBody Article article, @RequestParam int quantity) {
        return panierService.addArticleToPanier(id, article, quantity);
    }

    @DeleteMapping("/{panierId}/remove/{articleId}")
    public Panier removeArticleFromPanier(@PathVariable Long panierId, @PathVariable Long articleId) {
        return panierService.removeArticleFromPanier(panierId, articleId);
    }
}
