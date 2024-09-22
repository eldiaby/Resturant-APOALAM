import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2'; // Import SweetAlert

function ProfileOrders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        // Fetch the orders data from the API
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get('http://localhost:5000/api/order', {
                    headers: {
                        token: `${token}`, // Pass the token as Authorization header
                    },
                });
                setOrders(response.data.allOrders); // Set the orders state with the fetched data
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Function to handle Cancel Order
    const handleDelete = (orderId) => {
        // Show SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to cancel this order? This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token'); // Get token from localStorage
                    await axios.delete(`http://localhost:5000/api/order/${orderId}`, {
                        headers: {
                            token: token,
                        },
                    });
                    // Remove the deleted order from the Table
                    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
                    // Show success message
                    Swal.fire('Deleted!', 'Your order has been cancelled.', 'success');
                } catch (error) {
                    console.error('Error deleting order:', error);
                    Swal.fire('Failed!', 'Failed to delete the order. Please try again.', 'error');
                }
            }
        });
    };



    return (
        <div className="section-container">
            {/* banner */}
            <div className="pt-36 pb-10 max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="pt-24 flex flex-col items-center justify-center gap-8">
                    {/* texts */}
                    <div className="px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Track All Your <span className="text-green">Orders</span>
                        </h2>
                    </div>
                </div>
            </div>
            {/* Table for the cart */}
            {
                orders.length > 0 ? <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-green text-white rounded-sm">
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Meals Quantity</th>
                                    <th>Delivery Status</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td> {new Date(order.createdAt).toLocaleDateString()} <br />
                                            {new Date(order.createdAt).toLocaleTimeString()}</td>
                                        <td>
                                            {order.mealItems.reduce((acc, item) => acc + item.quantity, 0)}
                                        </td>
                                        <td className="capitalize">{order.status}</td>
                                        <td className="capitalize">{order.paymentStatus}</td>
                                        {order.status == "pending" &&
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(order._id)}
                                                    className="btn btn-ghost"
                                                    title="Cancel Order"
                                                >
                                                    <FaTrash className="text-red-500" />
                                                </button>
                                            </td>
                                        }

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                    : <h6 className="md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
                        No Orders Yet!
                    </h6>
            }

        </div >
    );
}

export default ProfileOrders;
