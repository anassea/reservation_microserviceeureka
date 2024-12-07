import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer Rea ctDOM du package react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import du BrowserRouter pour le routage

// Créer le "root" pour React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre l'application avec BrowserRouter pour le routage
root.render(
    <React.StrictMode>
        <BrowserRouter> {/* Envelopper votre application dans BrowserRouter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
