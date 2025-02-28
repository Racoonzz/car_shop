import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CartModal({ cart, toggleCart, updateCart }) {
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {})
  );

  // Ensure cart items are initialized correctly when cart prop changes
  useEffect(() => {
    setQuantities(
      cart.reduce((acc, product) => {
        acc[product.id] = product.quantity || 1;
        return acc;
      }, {})
    );
  }, [cart]);

  // Calculate total with updated quantity
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + (parseFloat(product.price) || 0) * (quantities[product.id] || 1),
      0
    );
  };

  // Handle quantity change and update cart
  const handleQuantityChange = (id, e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure value is a valid number
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
    updateCart(id, value); // Update cart with the new quantity
  };

  // Handle adding a product to the cart
  const handleAddProductToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Update the quantity if the product already exists in the cart
      updateCart(product.id, existingProduct.quantity + 1);
    } else {
      // Add the new product with a default quantity of 1
      updateCart(product.id, 1);
    }
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    updateCart(id, 0); // This will set the quantity to 0, effectively removing the item
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-start z-50"
      onClick={toggleCart} // Close cart when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-96 relative top-10 transition-transform transform scale-100 ease-in-out duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside cart from closing it
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Shopping Cart</h2>

        {cart.length > 0 ? (
          <div>
            {cart.map((product) => (
              <div key={product.id} className="cart-item mb-4 flex items-center border-b pb-4">
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
                    onChange={(e) => handleQuantityChange(product.id, e)} // Update quantity
                    aria-label={`Quantity for ${product.name}`} // Accessibility improvement
                  />
                  <button
                    onClick={() => handleRemoveItem(product.id)} // Remove item
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="total mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total: {calculateTotal()} Ft</h3>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty!</p>
        )}

        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={toggleCart} // Close the cart
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          >
            Close
          </button>
          <button
            onClick={() => alert('Proceeding to checkout')} // Placeholder for checkout action
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // other props...
    })
  ).isRequired,
  toggleCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
};
