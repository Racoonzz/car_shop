import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';

const EditProduct = ({ product }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [models, setModels] = useState(product.models);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [categoryId, setCategoryId] = useState(product.categoryId);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(product.pictureUrl);

    useEffect(() => {
        setExistingImage(product.pictureUrl);
    }, [product]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        // Create form data
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Important for Laravel
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('categoryId', parseInt(categoryId, 10)); // Ensure it's an integer
        
        if (image) {
            formData.append('image', image);
        }

        // Debug: Check formData values
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            // Send POST request (with _method='PUT')
            const response = await axios.post(`/api/products/${product.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data);
            setSuccessMessage('Product updated successfully!');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                console.log('Validation errors:', error.response.data.errors);
                setErrorMessage(`Validation errors: ${Object.values(error.response.data.errors).join(', ')}`);
            } else {
                setErrorMessage('Error updating product. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800">Edit Product</h2>}>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Product</h2>

                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 p-2 w-full border rounded-md" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-2 p-2 w-full border rounded-md" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Models</label>
                        <input type="text" value={models} onChange={(e) => setModels(e.target.value)} required className="mt-2 p-2 w-full border rounded-md" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="mt-2 p-2 w-full border rounded-md" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Category</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="mt-2 p-2 w-full border rounded-md">
                            <option value="">Select Category</option>
                            <option value="1">Interior</option>
                            <option value="2">Exterior</option>
                            <option value="3">Performance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-2 p-2 w-full border rounded-md" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Product Image</label>
                        <div className="flex items-center space-x-4">
                            {existingImage && (
                                <img src={`/storage/${existingImage}`} alt="Product" className="mt-2 h-32 object-cover" />
                            )}
                            <div className="flex flex-col">
                                <input 
                                    type="file" 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                    className="mt-2 p-2 w-full border rounded-md" 
                                />
                                {image && (
                                    <p className="mt-2 text-sm text-gray-500">Selected file: {image.name}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}>
                            {loading ? 'Updating Product...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditProduct;
