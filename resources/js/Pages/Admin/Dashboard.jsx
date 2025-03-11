import React, { useState, useEffect } from 'react';
import AdProduct from '@/Components/AdProduct';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <AdProduct
            onProductAdded={handleProductAdded}
            onProductUpdated={handleProductUpdated}
            editingProduct={editingProduct}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>
          
          {products.length === 0 ? (
            <p className="text-gray-500">No products available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-medium text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-gray-500 mt-2">Category: {product.category_id}</p>
                  <p className="text-gray-500 mt-2">Models: {product.models}</p>
                  <p className="text-gray-500 mt-2">Quantity: {product.quantity}</p>
                  {product.pictureUrl && (
                    <img
                      src={`/storage/img/${product.pictureUrl}`}
                      alt={product.name}
                      className="mt-4 w-full h-48 object-cover rounded-lg"
                    />
                  )}

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
