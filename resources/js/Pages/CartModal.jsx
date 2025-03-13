import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CheckoutPage from './CheckoutPage';

export default function CartModal({ cart, toggleCart, updateCart }) {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  // Fetching product data (including the latest quantities and other details)
  useEffect(() => {
    // This fetches the current list of products from your database or API
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Use product data to initialize quantities
  useEffect(() => {
    const initialQuantities = cart.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const calculateTotal = useMemo(() => {
    return cart.reduce(
      (total, product) =>
        total + (parseFloat(product.price) || 0) * (quantities[product.id] || 1),
      0
    );
  }, [cart, quantities]);

  const handleQuantityChange = (id, e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    const maxQuantity = products.find((product) => product.id === id)?.quantity || 1; // Get stock
    const updatedValue = Math.min(value, maxQuantity); // Prevent overstocking

    setQuantities((prev) => ({ ...prev, [id]: updatedValue }));

    updateCart(id, updatedValue, cart.find(item => item.id === id)); // Ensure cart updates properly
};


  const handleRemoveItem = (id) => {
    updateCart(id, 0); // Remove item from cart
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-start z-50"
      onClick={toggleCart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl w-96 relative top-10 transition-transform transform scale-100 ease-in-out duration-300"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Shopping Cart</h2>

        {cart.length > 0 ? (
          <div>
            <div
              className={`product-list ${cart.length > 3 ? 'overflow-y-auto max-h-80' : ''}`}
            >
              {cart.map((product) => (
                <motion.div
                  key={product.id}
                  className="cart-item mb-4 flex items-center border-b pb-4 hover:bg-gray-100 transition rounded-lg p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img
                    src={product.pictureUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
                    <p className="text-gray-500">{product.price} Ft</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={quantities[product.id] || 1}
                      min="1"
                      className="w-12 p-1 border rounded-md text-center"
                      onChange={(e) => handleQuantityChange(product.id, e)}
                      aria-label={`Quantity for ${product.name}`}
                    />
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="total mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-700">Total: {calculateTotal.toFixed(2)} Ft</h3>
              <button
                onClick={handleCheckout}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600 transition-all duration-150 transform active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Your cart is empty.
          </div>
        )}

        {isCheckoutOpen && (
          <CheckoutPage
            cart={cart}
            toggleCheckout={handleCloseCheckout}
            calculateTotal={calculateTotal}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.array.isRequired,
  toggleCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
};