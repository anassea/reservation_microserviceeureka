package com.example.reservation_microservice.service;

import com.example.reservation_microservice.model.Article;
import com.example.reservation_microservice.model.Panier;
import com.example.reservation_microservice.model.PanierItem;
import com.example.reservation_microservice.repository.PanierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PanierService {

    @Autowired
    private PanierRepository panierRepository;

    public Panier savePanier(Panier panier) {
        return panierRepository.save(panier);
    }

    public Panier getPanierById(Long id) {
        return panierRepository.findById(id).orElse(null);
    }

    public Panier addArticleToPanier(Long panierId, Article article, int quantity) {
        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        // Vérifie si l'article existe déjà dans le panier
        boolean found = false;
        for (PanierItem item : panier.getItems()) {
            if (item.getArticle().getId().equals(article.getId())) {
                item.setQuantity(item.getQuantity() + quantity);
                found = true;
                break;
            }
        }

        // Si l'article n'existe pas encore, ajoute un nouvel élément au panier
        if (!found) {
            PanierItem newItem = new PanierItem();
            newItem.setArticle(article);
            newItem.setQuantity(quantity);
            panier.getItems().add(newItem);
        }

        // Met à jour le total du panier
        updateTotal(panier);

        return panierRepository.save(panier);
    }

    public Panier removeArticleFromPanier(Long panierId, Long articleId) {
        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        // Recherche et suppression de l'article
        panier.getItems().removeIf(item -> item.getArticle().getId().equals(articleId));

        // Mise à jour du total après suppression
        updateTotal(panier);

        return panierRepository.save(panier);
    }

    private void updateTotal(Panier panier) {
        double total = panier.getItems().stream()
                .mapToDouble(PanierItem::getTotalPrice)
                .sum();
        panier.setTotal(total);
    }
}
