import React, { useState } from 'react';
import PaymentAndShipmentPage from './PaymentAndShipmentPage';

export default function CheckoutPage({ cart, updateCart }) {
  // Shipping info state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  // State for managing the checkout page visibility
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(true); // This controls the visibility of the cart modal

  // Handle input change for shipping info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission and open the checkout page
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsCheckoutOpen(true); // Open the PaymentAndShipmentPage
    setIsCartModalOpen(false); // Close the cart modal when proceeding to checkout
  };

  // Handle close action for the checkout page
  const closeCheckout = () => {
    setIsCheckoutOpen(false); // Close the PaymentAndShipmentPage
    setIsCartModalOpen(true); // Reopen the cart modal
  };

  return (
    <div>
      {/* Conditionally render the Cart Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-4/5 max-w-5xl h-[60%] overflow-y-auto transition-transform transform scale-100 ease-in-out duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Checkout</h2>

            {/* Shipping Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shipping form fields */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="postalCode" className="block text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={closeCheckout} // Close checkout page when clicked
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Conditionally render PaymentAndShipmentPage */}
      {isCheckoutOpen && (
        <PaymentAndShipmentPage 
          cart={cart}
          closeCheckout={closeCheckout}
        />
      )}
    </div>
  );
}
