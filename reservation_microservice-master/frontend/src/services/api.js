const API_BASE_URL = "http://localhost:9007";

// Créer un nouveau panier
export const createPanier = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/panier`, {
            method: "POST",
        });
        const data = await response.json();
        console.log('Panier créé:', data); // Vérifiez ici si le panier est bien créé
        return data;
    } catch (error) {
        console.error("Erreur lors de la création du panier:", error);
        throw error;
    }
};

// Récupérer les catégories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/categories`);
        const data = await response.json();
        console.log('Catégories récupérées:', data); // Vérifiez ici les catégories récupérées
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        throw error;
    }
};

// Récupérer les articles d'une catégorie
export const fetchArticlesByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${category}`);
        const data = await response.json();
        console.log(`Articles de la catégorie ${category}:`, data); // Vérifiez ici les articles récupérés
        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des articles de la catégorie ${category}:`, error);
        throw error;
    }
};

// Ajouter un article au panier
export const addToPanier = async (panierId, article, quantity) => {
    try {
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
        const data = await response.json();
        console.log('Article ajouté au panier:', data); // Vérifiez ici la réponse de l'ajout
        return data;
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        throw error;
    }
};

// Récupérer le contenu du panier
export const fetchPanier = async (panierId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/panier/${panierId}`);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du panier");
        }
        const data = await response.json();
        console.log('Contenu du panier:', data); // Vérifiez ici les articles dans le panier
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
        throw error;
    }
};

// Initialiser une réservation
export const createReservation = async (panierId) => {
    try {
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
        const data = await response.json();
        console.log('Réservation créée:', data); // Vérifiez ici la réservation créée
        return data;
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la réservation:", error);
        throw error;
    }
};

// Mettre à jour les informations de la réservation
export const updateReservationInfo = async (reservationInfo) => {
    try {
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
        const data = await response.json();
        console.log('Informations de réservation mises à jour:', data); // Vérifiez ici les infos mises à jour
        return data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des informations de réservation:", error);
        throw error;
    }
};

// Exemple d'affichage des articles du panier dans le front-end
const displayPanier = async (panierId) => {
    try {
        const panierData = await fetchPanier(panierId);
        const items = panierData.items; // Supposons que `items` contient la liste des articles
        if (items && items.length > 0) {
            items.forEach(item => {
                console.log(`Nom de l'article: ${item.name}, Quantité: ${item.quantity}`);
                // Code pour afficher dans le UI (ex. en React)
                // Par exemple :
                // <div key={item.id}>
                //     <p>{item.name}</p>
                //     <p>Quantité : {item.quantity}</p>
                // </div>
            });
        } else {
            console.log("Le panier est vide.");
        }
    } catch (error) {
        console.error("Erreur lors de l'affichage du panier:", error);
    }
};
