// export default CartPage;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CheckOutBtn from "../../components/CheckOutBtn";
import { CartContext } from "../../context/cartContext";
import Loader from "./loader/loader";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useState(1);
  const { setCartLength } = useContext(CartContext); // Use the context
  const token = localStorage.getItem("token"); // Get token from localStorage

  // Fetch cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            token: token,
          },
        });
        console.log(response.data.cart);
        setCart(...response.data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // const handleQuantityChange = async (mealId, newQuantity) => {
  //   try {
  //     console.log(newQuantity);
  //     let updatedCart = await axios.post(`http://localhost:5000/api/cart/${mealId}`, { quantity: newQuantity }, {
  //       headers: {
  //         token: token,
  //       },
  //     });
  //     // const updatedCart = await axios.get("http://localhost:5000/api/cart", {
  //     //   headers: {
  //     //     token: token,
  //     //   },
  //     // });
  //     setCart(updatedCart.data.cart);
  //     // console.log(updatedCart);
  //   } catch (error) {
  //     console.error("Error updating quantity", error);
  //   }
  // };

  const handleQuantityChange = async (mealId, newQuantity) => {
    console.log(mealId);
    try {
      const updatedCart = await axios.put(
        `http://localhost:5000/api/cart/${mealId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      // Update the cart state with the updated cart from the response
      console.log(updatedCart.data.cart);
      setCart(updatedCart.data.cart);
    } catch (error) {
      console.error("Failed to update meal quantity:", error);
    }
  };

  const handleDelete = async (mealId) => {
    try {
      // Show confirmation dialog before deleting
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        await axios.delete(`http://localhost:5000/api/cart/${mealId}`, {
          headers: {
            token: token,
          },
        });

        // Fetch updated cart
        const updatedCart = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            token: token,
          },
        });
        setCart(...updatedCart.data.cart);

        setCartLength((prevCartLength) => prevCartLength - 1);

        // Show success message
        Swal.fire(
          "Deleted!",
          "Your meal has been removed from the cart.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting meal from cart", error);

      // Show error message if something goes wrong
      Swal.fire("Error!", "There was an issue deleting the meal.", "error");
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { shippingDetails: { address: "Your address" } },
        {
          headers: {
            token: token,
          },
        }
      );
      alert("Order placed successfully!");
      setCart(null);
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="section-container">
      <div className="pt-36 max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="pt-24 flex flex-col items-center justify-center gap-8">
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added To The <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {cart?.mealItems?.length > 0 ? (
        <>
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
                  <tr key={meal.mealId._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={meal.mealId.imageUrl}
                              alt={meal.mealId.name}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{meal.mealId.name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="btn btn-xs"
                          onClick={() =>
                            handleQuantityChange(
                              meal.mealId._id,
                              meal.quantity - 1
                            )
                          }
                          disabled={meal.quantity === 1}
                        >
                          -
                        </button>
                        <span>{meal.quantity}</span>
                        <button
                          className="btn btn-xs"
                          onClick={() =>
                            handleQuantityChange(
                              meal.mealId._id,
                              meal.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${meal.mealId.price * meal.quantity}</td>
                    <td>
                      <button
                        className="btn bg-red btn-xs text-white"
                        onClick={() => handleDelete(meal.mealId._id)}
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
            <CheckOutBtn items={cart?.mealItems} />
          </div>
        </>
      ) : (
        <h6 className="md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
          No Meals In The Cart Yet!
        </h6>
      )}
    </div>
  );
}

export default CartPage;
