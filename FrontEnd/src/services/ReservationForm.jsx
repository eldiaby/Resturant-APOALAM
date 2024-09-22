// ReservationForm.jsx
import { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        tableNumber: '',
        numberOfGuests: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Replace with actual token retrieval
            const response = await axios.post('http://localhost:5000/api/reservations', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Reservation booked successfully!');
        } catch (error) {
            setMessage('Failed to book reservation. Please try again.');
        }
    };

    return (

        <div className="py-40">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className=" text-2xl font-semibold text-gray-800 mb-4">Reserve a Table</h2>
                {message && <div className="p-2 bg-green-100 text-green-700 rounded mb-4">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Table Number</label>
                        <input
                            type="number"
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            min="1"
                            max="50"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Number of Guests</label>
                        <input
                            type="number"
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                            min="1"
                            max="10"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                        Reserve Now
                    </button>
                </form>
            </div>
        </div>


    );
};

export default ReservationForm;
