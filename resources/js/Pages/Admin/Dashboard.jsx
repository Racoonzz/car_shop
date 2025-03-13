import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';
import { Link } from '@inertiajs/inertia-react';

const ListProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`/api/products/${id}`);
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                console.error('Failed to delete product:', err);
            }
        }
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800">List Products</h2>}>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Product List</h2>

                {products.length === 0 ? (
                    <p className="text-gray-500 text-center">No products available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-transform duration-300 hover:scale-105"
                            >
                                <h3 className="text-sm md:text-base font-semibold text-center bg-gray-800 text-white py-1 px-3 rounded">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-gray-600 mt-2 h-12 overflow-hidden text-ellipsis text-wrap text-center">
                                    {product.description}
                                </p>
                                {product.pictureUrl && (
                                    <img
                                        src={`/storage/${product.pictureUrl}`}
                                        alt={product.name}
                                        className="mt-3 w-full max-w-[200px] h-[200px] object-cover rounded-md shadow-sm"
                                    />
                                )}
                                <div className="mt-auto flex flex-col items-center w-full">
                                    <h3 className="text-sm font-semibold mt-2">{product.price} Ft</h3>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full">
                                        <Link 
                                            href={`/admin/products/${product.id}/edit`} 
                                            className="w-full bg-blue-500 text-white py-2 text-sm text-center rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product.id)} 
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

export default ListProducts;
