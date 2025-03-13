import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';
import { Link } from '@inertiajs/inertia-react';  // Use Inertia's Link component

const Orders = () => {
    const [orders, setOrders] = useState([]); // Ensures orders is an array

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            console.log(response.data); // Inspect the data here
            setOrders(Array.isArray(response.data) ? response.data : []);  // Ensure it's an array
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setOrders([]);  // Fallback to an empty array if fetch fails
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`/api/orders/${id}`);
                setOrders(orders.filter(order => order.id !== id));
            } catch (err) {
                console.error('Failed to delete order:', err);
            }
        }
    };

    const handleUpdate = async (id, finalised) => {
        try {
            await axios.put(`/api/orders/${id}`, { finalised });
            setOrders(orders.map(order =>
                order.id === id ? { ...order, finalised } : order
            ));
        } catch (err) {
            console.error('Failed to update order:', err);
        }
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800">Manage Orders</h2>}>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order List</h2>

                {Array.isArray(orders) && orders.length === 0 ? (
                    <p className="text-gray-500">No orders available</p>
                ) : (
                    Array.isArray(orders) && orders.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                                    <h3 className="text-xl font-medium text-gray-800">Order #{order.id}</h3>
                                    <p className="text-gray-600 mt-2">Total Price: ${order.totalPrice}</p>
                                    <p className="text-gray-600 mt-2">Finalised: {order.finalised ? 'Yes' : 'No'}</p>

                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() => handleUpdate(order.id, !order.finalised)}
                                            className="bg-blue-500 text-white p-2 rounded"
                                        >
                                            {order.finalised ? 'Unfinalize' : 'Finalize'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-red-500 text-white p-2 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <Link href={`/admin/orders/${order.id}/details`} className="mt-4 inline-block text-blue-500 underline">
                                        View Order Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </AdminLayout>
    );
};

export default Orders;
