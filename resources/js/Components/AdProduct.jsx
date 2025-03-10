import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const AdProduct = () => {
  const [image, setImage] = useState(null);
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    categoryId: "",
    models: "",
    price: "", // ✅ Added price
    quantity: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setData('image', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("models", data.models);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);

    if (image) {
      formData.append("image", image);
    }

    post("/api/products", formData);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="categoryId"
            name="categoryId"
            value={data.categoryId}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Models */}
        <div>
          <label htmlFor="models" className="block text-sm font-medium text-gray-700">
            Models
          </label>
          <input
            type="text"
            id="models"
            name="models"
            value={data.models}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-sm file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={processing}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-500 disabled:bg-indigo-300"
          >
            {processing ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdProduct;
