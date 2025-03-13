import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';

const ManageProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [models, setModels] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('categoryId', Number(categoryId));
        formData.append('models', models);
    
        if (image) {
            formData.append('image', image);
        }
    
        try {
            const response = await axios.post('/api/products', formData);
            setSuccessMessage('Product added successfully!');
            setLoading(false);
        } catch (error) {
            setErrorMessage('Failed to add product');
            console.error('Error:', error);
            setLoading(false);
        }
    };
    
      

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800">Add/Remove Products</h2>}>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Products</h2>

                {/* Display success or error messages */}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                {/* Product Form */}
                <form onSubmit={handleSubmit} encType='multipart/form-data' className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="models" className="block text-gray-700">Models</label>
                        <input
                            type="text"
                            id="models"
                            value={models}
                            onChange={(e) => setModels(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="categoryId" className="block text-gray-700">Category</label>
                        <select
                            id="categoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="1">Interior</option>
                            <option value="2">Exterior</option>
                            <option value="3">Performance</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-gray-700">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-2 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ManageProducts;
