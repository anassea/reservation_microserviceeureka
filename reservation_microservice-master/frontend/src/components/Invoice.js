// /src/components/Invoice.js
import React, { useState, useEffect } from 'react';
import { getInvoice } from '../services/api';

const Invoice = ({ reservationId }) => {
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            const data = await getInvoice(reservationId);
            setInvoice(data);
        };

        if (reservationId) {
            fetchInvoice();
        }
    }, [reservationId]);

    if (!invoice) return <div>Loading invoice...</div>;

    return (
        <div>
            <h2>Invoice</h2>
            <p>Reservation ID: {invoice.id}</p>
            <p>Total: {invoice.total}</p>
        </div>
    );
};

export default Invoice;
