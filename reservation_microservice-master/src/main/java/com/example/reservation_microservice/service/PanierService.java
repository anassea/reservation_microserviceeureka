package com.example.reservation_microservice.service;

import com.example.reservation_microservice.model.Article;
import com.example.reservation_microservice.model.Panier;
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

    // Méthode pour supprimer un article du panier
    public Panier removeArticleFromPanier(Long panierId, Long articleId) {
        // Recherche du panier par son ID
        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        // Recherche de l'article à supprimer dans la liste des articles du panier
        Article articleToRemove = panier.getArticles().stream()
                .filter(article -> article.getId().equals(articleId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Article non trouvé dans le panier"));

        // Suppression de l'article
        panier.getArticles().remove(articleToRemove);

        // Mise à jour du total du panier après suppression
        panier.setTotal(panier.getArticles().stream()
                .mapToDouble(Article::getTotalPrice)  // Calcul du total avec les articles restants
                .sum());

        // Sauvegarde du panier mis à jour
        return panierRepository.save(panier);
    }

    public Panier addArticleToPanier(Long panierId, Article article) {
        // Recherche du panier existant
        Panier panier = panierRepository.findById(panierId)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        // Vérifie si l'article existe déjà dans le panier
        boolean articleExists = false;
        for (Article existingArticle : panier.getArticles()) {
            if (existingArticle.getId().equals(article.getId())) {
                // Si l'article existe déjà, on met à jour la quantité
                existingArticle.setQuantity(existingArticle.getQuantity() + article.getQuantity());
                articleExists = true;
                break;
            }
        }

        // Si l'article n'existe pas dans le panier, on l'ajoute avec la quantité spécifiée
        if (!articleExists) {
            panier.getArticles().add(article);
        }

        // Met à jour le total du panier en fonction des quantités des articles
        panier.setTotal(panier.getArticles().stream()
                .mapToDouble(Article::getTotalPrice)  // On utilise getTotalPrice pour chaque article
                .sum());  // On calcule la somme des totaux de chaque article

        // Sauvegarde le panier avec les nouvelles informations
        return panierRepository.save(panier);
    }



    public Panier getPanierById(Long id) {
        return panierRepository.findById(id).orElse(null);
    }
}
