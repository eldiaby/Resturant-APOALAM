// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function CartPage() {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [quantity, setQuantity] = useState(1);
//   const token = localStorage.getItem('token'); // Get token from localStorage

//   // Fetch cart items on load
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/cart", {
//           headers: {
//             token: token,
//           },
//         });
//         console.log(response.data.cart)
//         setCart(...response.data.cart);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart", error);
//         setLoading(false);
//       }
//     };
//     fetchCart();
//   }, []);

//   // const handleQuantityChange = async (mealId, newQuantity) => {
//   //   try {
//   //     console.log(newQuantity);
//   //     let updatedCart = await axios.post(`http://localhost:5000/api/cart/${mealId}`, { quantity: newQuantity }, {
//   //       headers: {
//   //         token: token,
//   //       },
//   //     });
//   //     // const updatedCart = await axios.get("http://localhost:5000/api/cart", {
//   //     //   headers: {
//   //     //     token: token,
//   //     //   },
//   //     // });
//   //     setCart(updatedCart.data.cart);
//   //     // console.log(updatedCart);
//   //   } catch (error) {
//   //     console.error("Error updating quantity", error);
//   //   }
//   // };

//   const handleQuantityChange = async (mealId, newQuantity) => {
//     console.log(mealId)
//     try {
//       const updatedCart = await axios.put(`http://localhost:5000/api/cart/${mealId}`, {
//         quantity: newQuantity,
//       }, {
//         headers: {
//           token: token,
//         }
//       });
//       // Update the cart state with the updated cart from the response
//       console.log(updatedCart.data.cart)
//       setCart(updatedCart.data.cart);
//     } catch (error) {
//       console.error('Failed to update meal quantity:', error);
//     }
//   };

//   const handleDelete = async (mealId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/${mealId}`, {
//         headers: {
//           token: token,
//         },
//       });
//       const updatedCart = await axios.get("http://localhost:5000/api/cart", {
//         headers: {
//           token: token,
//         },
//       });
//       setCart(...updatedCart.data.cart);
//     } catch (error) {
//       console.error("Error deleting meal from cart", error);
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/cart", { shippingDetails: { address: "Your address" } }, {
//         headers: {
//           token: token,
//         },
//       });
//       alert("Order placed successfully!");
//       setCart(null);
//     } catch (error) {
//       console.error("Error during checkout", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading cart...</div>;
//   }

//   return (
//     <div className="section-container">
//       <div className="pt-36 max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
//         <div className="pt-24 flex flex-col items-center justify-center gap-8">
//           <div className="px-4 space-y-7">
//             <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
//               Items Added To The <span className="text-green">Cart</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       {
//         cart?.mealItems?.length > 0 ?
//           <>
//             <div className="overflow-x-auto">
//               <table className="table">
//                 <thead className="bg-green text-white rounded-sm">
//                   <tr>
//                     <th>#</th>
//                     <th>Food</th>
//                     <th>Item name</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart?.mealItems?.map((meal, index) => (
//                     <tr key={meal.mealId._id}>
//                       <td>{index + 1}</td>
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <div className="avatar">
//                             <div className="mask mask-squircle h-12 w-12">
//                               <img
//                                 src={meal.mealId.imageUrl}
//                                 alt={meal.mealId.name}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{meal.mealId.name}</td>
//                       <td>
//                         <div className="flex items-center gap-2">
//                           <button
//                             className="btn btn-xs"
//                             onClick={() =>
//                               handleQuantityChange(meal.mealId._id, meal.quantity - 1)
//                             }
//                             disabled={meal.quantity === 1}
//                           >
//                             -
//                           </button>
//                           <span>{meal.quantity}</span>
//                           <button
//                             className="btn btn-xs"
//                             onClick={() =>
//                               handleQuantityChange(meal.mealId._id, meal.quantity + 1)
//                             }
//                           >
//                             +
//                           </button>
//                         </div>
//                       </td>
//                       <td>${meal.mealId.price}</td>
//                       <td>
//                         <button
//                           className="btn btn-danger btn-xs"
//                           onClick={() => handleDelete(meal.mealId._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="py-6 flex justify-center">
//               <button className="btn bg-green text-white" onClick={handleCheckout}>
//                 Checkout
//               </button>
//             </div>
//           </>
//           : <h6 className="md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
//             No Meals In The Cart Yet!
//           </h6>
//       }

//     </div>
//   );
// }

// export default CartPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckOutBtn from "../../components/CheckOutBtn";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useState(1);
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
      await axios.delete(`http://localhost:5000/api/cart/${mealId}`, {
        headers: {
          token: token,
        },
      });
      const updatedCart = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          token: token,
        },
      });
      setCart(...updatedCart.data.cart);
    } catch (error) {
      console.error("Error deleting meal from cart", error);
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
    return <div>Loading cart...</div>;
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
                    <td>${meal.mealId.price}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-xs"
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
