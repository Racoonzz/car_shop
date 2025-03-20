import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function CheckoutPage({
  cart = [],
  closeCheckout = () => console.warn('closeCheckout function not provided'),
  total = 0,
  deleteCart = () => console.warn('deleteCart function not provided'),
}) {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    shippingMethod: '1',
    paymentMethod: '1',
  });

  const shippingOptions = [
    { label: 'Standard (3-5 business days)', value: '1', price: 1000 },
    { label: 'Express (1-2 business days)', value: '2', price: 2500 },
    { label: 'SameDay Delivery', value: '3', price: 4000 },
  ];

  const paymentOptions = [
    { label: 'Credit Card', value: '1', fee: 0 },
    { label: 'Bank Transfer', value: '2', fee: 500 },
    { label: 'Cash on Delivery', value: '3', fee: 500 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cartItems = cart.map((item) => ({ productId: item.id, quantity: item.quantity }));

    try {
      const response = await axios.post('/orders', {
        items: cartItems,
        shippingMethod: parseInt(shippingInfo.shippingMethod, 10),
        paymentMethod: parseInt(shippingInfo.paymentMethod, 10),
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
      });

      alert(response.data.message);
      deleteCart();
      closeCheckout();
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error);
      alert(`Error placing order: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeCheckout();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeCheckout]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-xl w-4/5 max-w-5xl h-[60%] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input type="text" name="firstName" value={shippingInfo.firstName} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input type="text" name="lastName" value={shippingInfo.lastName} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={shippingInfo.email} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input type="text" name="city" value={shippingInfo.city} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input type="text" name="phone" value={shippingInfo.phone} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block text-gray-700">Shipping Method</label>
            <select name="shippingMethod" value={shippingInfo.shippingMethod} onChange={handleChange} className="w-full p-2 border rounded-md">
              {shippingOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label} - {option.price} Ft</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select name="paymentMethod" value={shippingInfo.paymentMethod} onChange={handleChange} className="w-full p-2 border rounded-md">
              {paymentOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label} {option.fee > 0 && `- ${option.fee} Ft`}</option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex justify-between">
            <button type="button" onClick={closeCheckout} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back to Cart</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Proceed to Payment</button>
          </div>
        </form>
        <div className="mt-4 text-lg font-semibold text-right">
          <p>Total: {Math.floor(total)} Ft</p>
        </div>
      </div>
    </div>
  );
}