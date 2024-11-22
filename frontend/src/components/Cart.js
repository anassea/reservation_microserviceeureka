// /src/components/Cart.js
import React from 'react';

const Cart = ({ cart, onProceedToReservation }) => {
    // Vérifier si 'cart' est null ou non défini
    if (!cart) {
        return <div>Loading your cart...</div>; // Affiche un message de chargement si le panier est encore null
    }

    // Vérifier si 'cart.products' est un tableau ou un objet valide
    if (!cart.products || cart.products.length === 0) {
        return <div>Your cart is empty.</div>; // Affiche un message si le panier est vide
    }

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cart.products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <button onClick={onProceedToReservation}>Proceed to Reservation</button>
        </div>
    );
};

export default Cart;
