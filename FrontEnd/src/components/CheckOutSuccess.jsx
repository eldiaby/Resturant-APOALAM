import React from "react";
import { Link } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <div className="mx-auto d-block">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">
            Checkout Successful
          </h2>
          <p className="text-gray-700 mb-2">
            Your order might take some time to process.
          </p>
          <p className="text-gray-700 mb-2">
            Check your order status on your order Page .
          </p>
          <p className="text-gray-700">
            In case of any inquiries, contact support at{" "}
            <strong className="text-blue-500">support@onlineshop.com</strong>
          </p>
          <Link
            to="/orders"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Go to orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
