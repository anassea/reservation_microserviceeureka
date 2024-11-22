// /src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { getProductsByCategory, addProductToCart, removeProductFromCart } from '../services/api';

const ProductList = ({ category, cartId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProductsByCategory(category);
            setProducts(data);
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    const handleAddToCart = async (productId) => {
        await addProductToCart(cartId, productId);
        // Re-fetch products to update the cart state (e.g., plus/minus)
    };

    const handleRemoveFromCart = async (productId) => {
        await removeProductFromCart(cartId, productId);
        // Re-fetch products to update the cart state (e.g., plus/minus)
    };

    return (
        <div>
            <h2>Products in {category}</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => handleAddToCart(product.id)}>+</button>
                        <button onClick={() => handleRemoveFromCart(product.id)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
