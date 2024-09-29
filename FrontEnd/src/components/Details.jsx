import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from './../context/cartContext';

const DetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { setCartLength } = useContext(CartContext); // Access CartContext

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/meals/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const cartResponse = await axios.post(
                `http://localhost:5000/api/cart/${product._id}`,
                { quantity: 1 },
                { headers: { token } }
            );

            setCartLength(cartResponse.data.cart.mealItems.length); // Update cart length
            Swal.fire({
                icon: "success",
                title: "Added to cart successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error adding to cart", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "You must log in first!",
            });
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-0">
            <h1 className="text-5xl font-bold text-center mb-20 mt-40">Meal <span className="text-green">Details</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="image-wrapper">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover rounded-lg shadow-md"
                        style={{ width: "600px", height: "400px" }}
                    />
                </div>
                <div className="details-wrapper mt-10">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="mb-4">
                        <span className="text-gray-800 font-semibold">Category: </span>
                        <span className="text-gray-600">{product.category}</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-green-600 text-2xl font-semibold"><span className=" text-green">$</span>{product.price}</span>
                    </div>
                    <button
                        className="btn bg-green text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
                        onClick={handleAddToCart} // Handle adding to cart
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
