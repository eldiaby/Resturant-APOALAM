import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../context/cartContext";

const Cards = ({ item: { _id, name, description, price, imageUrl } }) => {
  const { cartLength, setCartLength } = useContext(CartContext);
  const [cartMeals, setCartMeals] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/cart`, {
          headers: { token },
        });
        setCartMeals(res.data.cart[0]?.mealItems || []);
      } catch (error) {
        console.error("Error fetching cart items", error.message);
      }
    };
    fetchCartItems();
  }, [cartLength]);

  const isAdded = cartMeals.find((ele) => ele.mealId._id === _id);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const cart = await axios.post(
        `http://localhost:5000/api/cart/${_id}`,
        { quantity: 1 },
        { headers: { token } }
      );

      setCartLength(cart.data.cart.mealItems.length);

      Swal.fire({
        icon: "success",
        title: "Added to cart successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding to cart", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must log in first!",
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 overflow-hidden">
      <Link to={`/menu/${_id}`}>
        <figure>
          <img
            src={imageUrl}
            alt={name}
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${_id}`}>
          <h2 className="card-title">{name}!</h2>
        </Link>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-green">$ </span> {price}
          </h5>
          {isAdded ? (
            <button className="btn bg-green text-white" disabled>
              Added
            </button>
          ) : (
            <button
              className="btn bg-green text-white"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
