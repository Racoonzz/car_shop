import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CheckoutPage from './CheckoutPage';

export default function CartModal({ cart, toggleCart, updateCart }) {
  const [quantities, setQuantities] = useState(() => {
    // Check if there's a cart saved in localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart ? savedCart.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {}) : cart.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {});
  });
  
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    const savedCart = cart.map(product => ({
      ...product,
      quantity: quantities[product.id] || 1,
    }));
    localStorage.setItem('cart', JSON.stringify(savedCart));
  }, [cart, quantities]);

  useEffect(() => {
    setQuantities(
      cart.reduce((acc, product) => {
        acc[product.id] = product.quantity || 1;
        return acc;
      }, {})
    );
  }, [cart]);

  const calculateTotal = useMemo(() => {
    return cart.reduce(
      (total, product) => total + (parseFloat(product.price) || 0) * (quantities[product.id] || 1),
      0
    );
  }, [cart, quantities]);

  const handleQuantityChange = (id, e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
    updateCart(id, value);  // Ensure that updateCart is correctly modifying the quantity in the cart
};


  const handleRemoveItem = (id) => {
    updateCart(id, 0);
  };

  const handleCheckout = () => {
    setCheckoutOpen(true); // Open the CheckoutPage modal
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false); // Close the CheckoutPage modal
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
          <div aria-live="polite">
            <div
              className={`product-list ${cart.length > 3 ? 'overflow-y-auto max-h-80' : ''}`}
              style={{
                overflowX: 'hidden', // Prevent horizontal scrolling
                scrollbarWidth: 'thin', // Firefox: Thin scrollbar
                scrollbarColor: '#B1B8C2 #E2E8F0', // Firefox: Light color thumb, subtle background
              }}
            >
              {cart.map((product) => (
                <motion.div 
                  key={product.id} 
                  className="cart-item mb-4 flex items-center border-b pb-4 hover:bg-gray-100 transition rounded-lg p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img src={product.pictureUrl} alt={product.name}
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
              <h3 className="text-lg font-semibold text-gray-800">Total: {calculateTotal} Ft</h3>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty!</p>
        )}

        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={toggleCart}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Close
          </button>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0} // Disable Checkout if cart is empty
            className={`px-4 py-2 rounded transition ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Checkout
          </button>
        </div>
      </motion.div>

      {/* CheckoutPage Modal */}
      {isCheckoutOpen && <CheckoutPage cart={cart} closeCheckout={handleCloseCheckout} />}
    </motion.div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  toggleCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
};
