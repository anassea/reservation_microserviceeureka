import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPanier,
  fetchCategories,
  fetchArticlesByCategory,
  addToPanier,
  fetchPanier,
  createReservation,
  updateReservationInfo,
} from "./services/api";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [panierId, setPanierId] = useState(null);
  const [panier, setPanier] = useState({ items: [], total: 0 });
  const [reservation, setReservation] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    address: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const panierData = await createPanier();
        setPanierId(panierData.id);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData || []);

        const initialPanier = await fetchPanier(panierData.id);
        setPanier(initialPanier || { items: [], total: 0 });
      } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
      }
    };
    init();
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    try {
      const articlesData = await fetchArticlesByCategory(category);
      setArticles(articlesData || []);
      setQuantities({});
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
    }
  };

  const handleQuantityChange = (articleId, quantity) => {
    setQuantities((prev) => ({ ...prev, [articleId]: quantity }));
  };

  const handleAddToPanier = async (article) => {
    const quantity = parseInt(quantities[article.id], 10) || 1;
    try {
      const payload = {
        id: article.id,
        name: article.name,
        category: article.category,
        price: article.price,
      };
      await addToPanier(panierId, payload, quantity);

      const updatedPanier = await fetchPanier(panierId);
      setPanier(updatedPanier || { items: [], total: 0 });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  const handleFinalizeOrder = async () => {
    try {
      const reservationData = await createReservation(panierId);
      setReservation(reservationData);
      setShowReservationForm(true);
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la réservation :", error);
    }
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReservationInfo({
        reservationId: reservation.id,
        panierId: panierId,
        ...reservationInfo,
      });
      setShowReservationForm(false);
      navigate("/confirmation", {
        state: { panier, reservationInfo },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation :", error);
    }
  };

  return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Section des catégories */}
          <div>
            <h2>Catégories</h2>
            <ul>
              {categories.length > 0 ? (
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
                    {articles.length > 0 ? (
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
            {panier.items.length > 0 ? (
                <div>
                  <ul>
                    {panier.items.map((product) => (
                        <li key={product.articleId || product.id} style={{ marginBottom: "10px" }}>
                          <p>Article : {product.name || product.articleName}</p>
                          <p>Quantité : {product.quantity}</p>
                        </li>
                    ))}
                  </ul>
                  <h3>Total: {panier.total} €</h3>
                  <button onClick={handleFinalizeOrder}>Finaliser la commande</button>
                </div>
            ) : (
                <p>Le panier est vide.</p>
            )}
          </div>
        </div>

        {/* Formulaire de réservation */}
        {showReservationForm && (
            <div>
              <h2>Informations de réservation</h2>
              <form onSubmit={handleReservationSubmit}>
                <label>
                  Adresse :
                  <input
                      type="text"
                      name="address"
                      value={reservationInfo.address}
                      onChange={handleReservationChange}
                      required
                  />
                </label>
                <br />
                <label>
                  Date :
                  <input
                      type="date"
                      name="date"
                      value={reservationInfo.date}
                      onChange={handleReservationChange}
                      required
                  />
                </label>
                <br />
                <label>
                  Heure :
                  <input
                      type="time"
                      name="time"
                      value={reservationInfo.time}
                      onChange={handleReservationChange}
                      required
                  />
                </label>
                <br />
                <button type="submit">Soumettre la réservation</button>
              </form>
            </div>
        )}
      </div>
  );
};

export default App;
