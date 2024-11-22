// /src/components/ReservationForm.js
import React, { useState } from 'react';
import { addReservationInfo } from '../services/api';

const ReservationForm = ({ reservationId, panierId }) => {
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async () => {
        await addReservationInfo(reservationId, panierId, address, date, time);
        alert('Reservation updated!');
    };

    return (
        <div>
            <h2>Reservation Info</h2>
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ReservationForm;
