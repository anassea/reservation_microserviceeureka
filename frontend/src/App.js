import React, { useEffect, useState } from "react";
import {
  createPanier,
  fetchCategories,
  fetchArticlesByCategory,
  addToPanier,
  fetchPanier
} from "../src/services/api";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [panierId, setPanierId] = useState(null);
  const [panier, setPanier] = useState({ items: [], total: 0 });

  // Initialisation du panier et des catégories
  useEffect(() => {
    const init = async () => {
      try {
        console.log("Initialisation du panier et récupération des catégories...");
        const panierData = await createPanier();
        console.log("Panier créé :", panierData);
        setPanierId(panierData.id);

        const categoriesData = await fetchCategories();
        console.log("Catégories récupérées :", categoriesData);
        setCategories(categoriesData || []);

        const initialPanier = await fetchPanier(panierData.id);
        console.log("Panier initial récupéré :", initialPanier);
        setPanier(initialPanier || { items: [], total: 0 });
      } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
      }
    };
    init();
  }, []);

  // Récupération des articles pour une catégorie
  const handleCategorySelect = async (category) => {
    console.log("Catégorie sélectionnée :", category);
    setSelectedCategory(category);
    try {
      const articlesData = await fetchArticlesByCategory(category);
      console.log("Articles pour la catégorie récupérés :", articlesData);
      setArticles(articlesData || []);
      setQuantities({});
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
    }
  };

  // Gestion des quantités
  const handleQuantityChange = (articleId, quantity) => {
    console.log(`Quantité mise à jour pour l'article ${articleId} :`, quantity);
    setQuantities((prev) => ({ ...prev, [articleId]: quantity }));
  };

  // Ajout au panier
  const handleAddToPanier = async (article) => {
    const quantity = parseInt(quantities[article.id], 10) || 1;
    console.log(`Ajout de l'article au panier :`, {
      article,
      quantity,
    });
    try {
      const payload = {
        id: article.id,
        name: article.name,
        category: article.category,
        price: article.price,
      };
      console.log("Envoi de la requête au backend avec payload :", payload);
      await addToPanier(panierId, payload, quantity);
      console.log("Article ajouté au panier, récupération du panier mis à jour...");

      // Rafraîchir le panier après ajout
      const updatedPanier = await fetchPanier(panierId);
      console.log("Panier mis à jour :", updatedPanier);

      // Mettre à jour le panier dans l'état
      setPanier(updatedPanier || { items: [], total: 0 });

    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  return (
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Section des catégories */}
        <div>
          <h2>Catégories</h2>
          <ul>
            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <li
                        key={category}
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                        onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </li>
                ))
            ) : (
                <p>Chargement des catégories...</p>
            )}
          </ul>
        </div>

        {/* Section des articles */}
        <div>
          <h2>Articles</h2>
          {selectedCategory ? (
              <div>
                <h3>Catégorie : {selectedCategory}</h3>
                <ul>
                  {articles && articles.length > 0 ? (
                      articles.map((article) => (
                          <li
                              key={article.id}
                              style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}
                          >
                            <div>
                              <p>{article.name}</p>
                              <p>Prix : {article.price} €</p>
                            </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                              <input
                                  type="number"
                                  min="1"
                                  placeholder="Quantité"
                                  style={{ width: "50px" }}
                                  value={quantities[article.id] || ""}
                                  onChange={(e) => handleQuantityChange(article.id, e.target.value)}
                              />
                              <button onClick={() => handleAddToPanier(article)}>Ajouter</button>
                            </div>
                          </li>
                      ))
                  ) : (
                      <p>Aucun article trouvé pour cette catégorie.</p>
                  )}
                </ul>
              </div>
          ) : (
              <p>Sélectionnez une catégorie pour voir les articles.</p>
          )}
        </div>

        {/* Section du panier */}
        <div>
          <h2>Panier</h2>
          {panier && panier.items && panier.items.length > 0 ? (
              <div>
                <ul>
                  {panier.items.map((product) => (
                      <li
                          key={product.articleId}
                          style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
                      >
                        <span>{product.articleName}</span> {/* Affichage du nom de l'article */}
                        <span>Quantité : {product.quantity}</span>
                      </li>
                  ))}
                </ul>
                <h3>Total: {panier.total} €</h3>
              </div>
          ) : (
              <p>Le panier est vide.</p>
          )}
        </div>
      </div>
  );
};

export default App;
