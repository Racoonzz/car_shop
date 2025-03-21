import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

const Orders = ({ orders }) => {
    // Function to handle order deletion
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            Inertia.delete(`/admin/orders/${id}`, {
                onSuccess: () => {
                    console.log(`Order ${id} deleted successfully`);
                },
                onError: (error) => {
                    console.error('Failed to delete order:', error);
                },
            });
        }
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800">Manage Orders</h2>}>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Order List</h2>

                {Array.isArray(orders) && orders.length === 0 ? (
                    <p className="text-gray-500 text-center">No orders available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.isArray(orders) && orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-transform duration-300 hover:scale-105"
                            >
                                <h3 className="text-sm md:text-base font-semibold text-center bg-gray-800 text-white py-1 px-3 rounded">
                                    Order #{order.id}
                                </h3>
                                <p className="text-xs text-gray-600 mt-2 h-12 overflow-hidden text-ellipsis text-wrap text-center">
                                    {order.firstName} {order.lastName}
                                </p>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    {order.finalised ? 'Completed' : 'Pending'}
                                </p>
                                <p className="text-xs text-gray-600 mt-2 text-center">
                                    Total: {order.totalPrice} Ft
                                </p>
                                <div className="mt-auto flex flex-col items-center w-full">
                                    <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="w-full bg-blue-500 text-white py-2 text-sm text-center rounded hover:bg-blue-600"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="w-full bg-red-500 text-white py-2 text-sm rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Orders;
