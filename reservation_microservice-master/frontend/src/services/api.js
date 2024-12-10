const API_BASE_URL = "http://localhost:9007";

// Créer un nouveau panier
export const createPanier = async () => {
    const response = await fetch(`${API_BASE_URL}/panier`, {
        method: "POST",
    });
    return await response.json();
};

// Récupérer les catégories
export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/articles/categories`);
    return await response.json();
};

// Récupérer les articles d'une catégorie
export const fetchArticlesByCategory = async (category) => {
    const response = await fetch(`${API_BASE_URL}/articles/${category}`);
    return await response.json();
};

// Ajouter un article au panier
export const addToPanier = async (panierId, article, quantity) => {
    const response = await fetch(`${API_BASE_URL}/panier/${panierId}/add?quantity=${quantity}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout au panier");
    }
    return await response.json();
};

// Récupérer le contenu du panier
export const fetchPanier = async (panierId) => {
    const response = await fetch(`${API_BASE_URL}/panier/${panierId}`);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération du panier");
    }
    return await response.json();
};

// Initialiser une réservation
export const createReservation = async (panierId) => {
    const response = await fetch(`${API_BASE_URL}/reservation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ panierId }),
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l'initialisation de la réservation");
    }
    return await response.json();
};

// Mettre à jour les informations de la réservation
export const updateReservationInfo = async (reservationInfo) => {
    const response = await fetch(`${API_BASE_URL}/reservation/info`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationInfo),
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des informations de réservation");
    }
    return await response.json();
};
