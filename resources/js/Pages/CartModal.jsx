import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CheckoutPage from './CheckoutPage';

export default function CartModal({ cart, toggleCart, updateCart, products, deleteCart }) {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  // Calculate the total price (without decimals)
  const calculateTotal = useMemo(() => {
    return Math.floor(
      cart.reduce(
        (total, product) =>
          total + (parseFloat(product.price) || 0) * (product.quantity || 1),
        0
      )
    );
  }, [cart]);

  // Handle quantity changes
  const handleQuantityChange = (id, e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure minimum quantity is 1
    const product = products.find((p) => p.id === id); // Find the product in the database
    const maxQuantity = product ? product.quantity : 1; // Use the product's stock quantity as the max
    const updatedValue = Math.min(value, maxQuantity); // Prevent overstocking

    updateCart(id, updatedValue); // Update the cart with the new quantity
  };

  // Handle removing an item
  const handleRemoveItem = (id) => {
    updateCart(id, 0); // Remove item from cart
  };

  // Handle checkout
  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  // Close checkout modal
  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
  };

  // Close modal when clicking outside
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleCart(); // Close the cart modal
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleCart]);

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-start z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef} // Ref for detecting clicks outside
        className="bg-white p-6 rounded-lg shadow-xl w-96 relative top-10 transition-transform transform scale-100 ease-in-out duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
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
              {cart.map((product) => {
                const productInDatabase = products.find((p) => p.id === product.id); // Find the product in the database
                const maxQuantity = productInDatabase ? productInDatabase.quantity : 1; // Use the product's stock quantity as the max

                return (
                  <motion.div
                    key={product.id}
                    className="cart-item mb-4 flex items-center border-b pb-4 hover:bg-gray-100 transition rounded-lg p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src={`/storage/${product.pictureUrl}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
                      <p className="text-gray-500">{Math.floor(product.price)} Ft</p> {/* Remove decimals */}
                      <p className="text-sm text-gray-500">Available: {maxQuantity}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={product.quantity || 1}
                        min="1"
                        max={maxQuantity} // Set the max quantity based on the database
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
                );
              })}
            </div>

            <div className="total mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-700">Total: {calculateTotal} Ft</h3> {/* Remove decimals */}
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
            closeCheckout={handleCloseCheckout}
            total={calculateTotal}
            deleteCart={deleteCart}
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
  products: PropTypes.array.isRequired,
  deleteCart: PropTypes.func.isRequired,
};