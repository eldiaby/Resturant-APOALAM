import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const ReservationPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reservedTables, setReservedTables] = useState([]);

  const today = dayjs();
  const maxDate = dayjs().add(30, "day");

  useEffect(() => {
    const fetchReservedTables = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reservations"); // reservations
        const data = await response.json();
        setReservedTables(data.reservedTables || []);
      } catch (error) {
        console.error("Error fetching reserved tables:", error);
      }
    };

    fetchReservedTables();
  }, []);

  const handleReservation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (reservedTables.includes(Number(tableNumber))) {
      setStatusMessage("The table is reserved. Please choose another table.");
      setIsLoading(false);
      return;
    }

    const reservationData = {
      date,
      time,
      tableNumber,
      numberOfGuests,
    };

    console.log(reservationData);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatusMessage(" You must log in");
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Reservation booked successfully!");
        setDate("");
        setTime("");
        setTableNumber("");
        setNumberOfGuests("");
      } else {
        if (response.status === 401) {
          setStatusMessage(data.message);
        } else {
          setStatusMessage(
            data.message || "Failed to book reservation. Please try again."
          );
        }
      }
    } catch (error) {
      setStatusMessage("Error booking reservation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidTime = (selectedTime) => {
    const selectedHour = parseInt(selectedTime.split(":")[0], 10);
    return selectedHour >= 10 || selectedHour < 4; // From 10 AM to 4 AM (next day)
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (isValidTime(selectedTime)) {
      setTime(selectedTime);
    } else {
      setStatusMessage("Please select a time between 10 AM and 4 AM.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray">
      <form
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg mt-20"
        onSubmit={handleReservation}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reserve Your <span className="text-green">Table</span>
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={today.format("YYYY-MM-DD")} // Disable past dates
            max={maxDate.format("YYYY-MM-DD")} // Limit to 5 days from today
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={time}
            onChange={handleTimeChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Table Number</label>
          <select
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          >
            <option value="">Select a table</option>
            <option value="1">Table 1</option>
            <option value="2">Table 2</option>
            <option value="3">Table 3</option>
            <option value="4">Table 4</option>
            <option value="5">Table 5</option>
            <option value="6">Table 6</option>
            <option value="7">Table 7</option>
            <option value="8">Table 8</option>
            <option value="9">Table 9</option>
            <option value="10">Table 10</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Number of Guests</label>
          <input
            type="number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
            min="1"
            max="20"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Reserve Now"}
        </button>

        {statusMessage && (
          <p
            className={`mt-4 text-center ${statusMessage.includes("successfully")
              ? "text-success"
              : "text-red"
              }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReservationPage;
