import React, { useState } from 'react';

export default function CheckoutPage({ cart, updateCart, closeCheckout }) {
  // Shipping info state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard', // Default shipping method
    paymentMethod: 'card', // Default payment method
    cashOnDelivery: false, // For cash on delivery option
  });

  // State for managing the checkout page visibility
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(true);

  // Shipping options (Hungarian)
  const shippingOptions = [
    { label: 'Standard (3-5 business days)', value: 'standard', price: 1000 }, // in HUF
    { label: 'Express (1-2 business days)', value: 'express', price: 2500 },  // in HUF
    { label: 'Aznapi Szállítás', value: 'nextDay', price: 4000 },  // in HUF
  ];

  // Payment options
  const paymentOptions = [
    { label: 'Credit Card', value: 'card', fee: 0 },  // No extra fee
    { label: 'Bank Transfer', value: 'bankTransfer', fee: 500 },  // Extra fee for bank transfer
    { label: 'Cash on Delivery', value: 'cashOnDelivery', fee: 500 },  // Extra fee for cash on delivery
  ];

  // Handle input change for shipping info
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission and open the checkout page
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(true); // Open the Payment and Shipment Page
  };

  // Handle close action for the checkout page
  const handleClose = () => {
    setIsCheckoutOpen(false); // Close the Payment and Shipment Page
    closeCheckout(); // Call parent function to close checkout in CartModal
  };

  // Function to check if next-day delivery is available
  const isNextDayDeliveryAvailable = () => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Disable next-day delivery if the time is after 2 PM or total is less than 100,000 HUF
    if (hour >= 12 || cartTotal < 100000) {
      return false;
    }
    return true;
  };

  // Calculate total price including cart total, shipping, and payment fees
  const calculateTotal = () => {
    const shipping = shippingOptions.find(
      (option) => option.value === shippingInfo.shippingMethod
    );
    const payment = paymentOptions.find(
      (option) => option.value === shippingInfo.paymentMethod
    );
    const shippingCost = shipping ? shipping.price : 0;
    const paymentFee = payment ? payment.fee : 0;

    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return cartTotal + shippingCost + paymentFee;
  };

  return (
    <div>
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-4/5 max-w-5xl h-[60%] overflow-y-auto transition-transform transform scale-100 ease-in-out duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Checkout</h2>

            {/* Shipping Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-gray-700">First Name</label>
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
                  <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
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
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
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
                <label htmlFor="address" className="block text-gray-700">Address</label>
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
                  <label htmlFor="city" className="block text-gray-700">City</label>
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
                  <label htmlFor="postalCode" className="block text-gray-700">Postal Code</label>
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
                <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
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

              {/* Shipping Method */}
              <div>
                <label htmlFor="shippingMethod" className="block text-gray-700">Shipping Method</label>
                <select
                  id="shippingMethod"
                  name="shippingMethod"
                  value={shippingInfo.shippingMethod}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {shippingOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === 'nextDay' && !isNextDayDeliveryAvailable()}
                    >
                      {option.label} - {option.price} HUF
                    </option>
                  ))}
                </select>
                {!isNextDayDeliveryAvailable() && (
                  <p className="text-red-500 text-sm mt-2">
                    Aznapi szállítás nem elérhető 14 óra után, illetve 100.000 Ft alatti rendelés esetén.
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={shippingInfo.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {paymentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} {option.fee > 0 && `- ${option.fee} HUF fee`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handleClose} // Close checkout page when clicked
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

            {/* Total Price */}
            <div className="mt-4 text-lg font-semibold text-right">
              <p>Total: {calculateTotal()} HUF</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
