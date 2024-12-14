import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
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
    const [step, setStep] = useState(1);
    const [showPanier, setShowPanier] = useState(false);

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
        setStep(2);
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
            // Ajoute l'article avec la quantité au panier
            await addToPanier(panierId, payload, quantity);

            // Met à jour le panier après ajout de l'article
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
            setStep(3);
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
        <div>
            <div>


                {/* Section des catégories */}
                {step === 1 && (
                    <div>
                        <h2>Catégories</h2>
                        <ul>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <li
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        <a href={`/categorie/${category}`}>{category}</a>
                                    </li>
                                ))
                            ) : (
                                <p>Chargement des catégories...</p>
                            )}
                        </ul>
                    </div>
                )}

                {/* Section des articles */}
                {step === 2 && selectedCategory && (
                    <div>
                        <h2>Articles</h2>
                        <h3>Catégorie : {selectedCategory}</h3>
                        <ul>
                            {articles.length > 0 ? (
                                articles.map((article) => (
                                    <li key={article.id}>
                                        <div>
                                            <p>{article.name}</p>
                                            <p>Prix : {article.price} €</p>
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Quantité"
                                                value={quantities[article.id] || ""}
                                                onChange={(e) =>
                                                    handleQuantityChange(article.id, e.target.value)
                                                }
                                            />
                                            <button onClick={() => handleAddToPanier(article)}>
                                                Ajouter
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>Aucun article trouvé pour cette catégorie.</p>
                            )}
                        </ul>
                    </div>
                )}

                {/* Section du panier */}
                {showPanier && (
                    <div
                        style={{
                            position: "absolute",
                            top: "60px",
                            right: "20px",
                            backgroundColor: "#fff",
                            padding: "15px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            borderRadius: "8px",
                            maxWidth: "300px",
                        }}
                    >
                        <h3>Panier</h3>
                        {panier.items.length > 0 ? (
                            <div>
                                <ul>
                                    {panier.items.map((product) => (
                                        <li key={product.id}>
                                            <p>Article : {product.article.name}</p> {/* Affiche le nom de l'article */}
                                            <p>Quantité : {product.quantity}</p> {/* Affiche la quantité */}
                                            <p>ID de l'article : {product.article.id}</p> {/* Affiche l'ID de l'article */}
                                            <p>Prix total pour cet article : {product.totalPrice} €</p> {/* Affiche le prix total de l'article */}
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <strong>Total : {panier.total} €</strong>
                                </div>
                                <div>
                                    <button onClick={handleFinalizeOrder}>Finaliser la commande</button>
                                </div>
                            </div>
                        ) : (
                            <p>Le panier est vide.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Section de finalisation de commande */}
            {step === 3 && (
                <div>
                    <h2>Finaliser la commande</h2>
                    <form onSubmit={handleReservationSubmit}>
                        <div>
                            <label htmlFor="address">Adresse</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={reservationInfo.address}
                                onChange={handleReservationChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={reservationInfo.date}
                                onChange={handleReservationChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="time">Heure</label>
                            <input
                                type="time"
                                name="time"
                                id="time"
                                value={reservationInfo.time}
                                onChange={handleReservationChange}
                                required
                            />
                        </div>

                        <button type="submit">Soumettre la réservation</button>
                    </form>
                </div>
            )}

            {/* Icone du panier fixée en haut à droite */}
            <div
                onClick={() => setShowPanier(!showPanier)}
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "#f8f8f8",
                    borderRadius: "50%",
                    padding: "10px",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                🛒
            </div>
        </div>
    );
};

export default App;
