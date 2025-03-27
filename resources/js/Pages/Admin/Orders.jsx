import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
// import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';


const Orders = ({ orders }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleDelete = () => {
        if (selectedOrder) {
            Inertia.delete(`/admin/orders/${selectedOrder.id}`, {
                onSuccess: () => {
                    console.log(`Order ${selectedOrder.id} deleted successfully`);
                    closeModal();
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
                                <p className="text-xs text-gray-600 mt-2 text-center">
                                    Shipping: {order.shippingMethod ? order.shippingMethod.name : 'N/A'}
                                </p>
                                <p className="text-xs text-gray-600 mt-2 text-center">
                                    Payment: {order.paymentMethod ? order.paymentMethod.name : 'N/A'}
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
                                            onClick={() => openModal(order)}
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

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                        <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
                        <p className="text-gray-600 mt-2">Are you sure you want to delete Order #{selectedOrder?.id}?</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes, Delete</button>
                            <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Orders;