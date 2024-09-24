import React, { useEffect, useState } from "react";
import axios from "axios";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCart(response.data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (mealId, newQuantity) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/${mealId}`, { quantity: newQuantity });
      const updatedCart = await axios.get("/api/cart");
      setCart(updatedCart.data.cart);
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleDelete = async (mealId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${mealId}`);
      const updatedCart = await axios.get("/api/cart");
      setCart(updatedCart.data.cart);
    } catch (error) {
      console.error("Error deleting meal from cart", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart", { shippingDetails: { address: "Your address" } });
      alert("Order placed successfully!");
      setCart(null);
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="section-container">
      <div className="py-36 max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-24 flex flex-col items-center justify-center gap-8">
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added To The <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.mealItems?.map((meal, index) => (
              <tr key={meal.mealId}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={meal.image}
                          alt={meal.name}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{meal.name}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        handleQuantityChange(meal.mealId, meal.quantity - 1)
                      }
                      disabled={meal.quantity === 1}
                    >
                      -
                    </button>
                    <span>{meal.quantity}</span>
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        handleQuantityChange(meal.mealId, meal.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${meal.price * meal.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger btn-xs"
                    onClick={() => handleDelete(meal.mealId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-6 flex justify-center">
        <button className="btn bg-green text-white" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
