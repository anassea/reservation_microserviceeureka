import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
    const location = useLocation();
    const { panier, reservationInfo } = location.state || {};

    return (
        <div style={{ padding: "20px" }}>
            <h2>Commande confirmée !</h2>
            <h3>Détails de la commande :</h3>
            <ul>
                {panier && panier.items.length > 0 ? (
                    panier.items.map((item) => (
                        <li key={item.articleId}>
                            {item.articleName} - {item.quantity} x {item.price} €
                        </li>
                    ))
                ) : (
                    <p>Aucun article dans la commande.</p>
                )}
            </ul>
            <h3>Total : {panier.total} €</h3>

            <h3>Informations de réservation :</h3>
            <p>Adresse: {reservationInfo?.address}</p>
            <p>Date: {reservationInfo?.date}</p>
            <p>Heure: {reservationInfo?.time}</p>

            <p>Commande bien reçue, merci !</p>
        </div>
    );
};

export default Confirmation;
