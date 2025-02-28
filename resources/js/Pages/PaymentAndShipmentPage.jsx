import React from 'react';

export default function PaymentAndShipmentPage({ cart, closeCheckout }) {

  const handleConfirmOrder = () => {
    alert('Order Confirmed');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Select Payment & Shipment</h2>

      {/* Payment Options */}
      <div className="mb-4">
        <label htmlFor="payment" className="block text-gray-700 mb-2">Payment Method</label>
        <select
          id="payment"
          className="w-full p-2 border rounded-md"
        >
          <option value="paypal">PayPal</option>
          <option value="bank">Bank Transfer</option>
          <option value="card">Credit Card</option>
        </select>
      </div>

      {/* Shipment Options */}
      <div className="mb-4">
        <label htmlFor="shipment" className="block text-gray-700 mb-2">Shipment Method</label>
        <select
          id="shipment"
          className="w-full p-2 border rounded-md"
        >
          <option value="gls">GLS</option>
          <option value="dpd">DPD</option>
          <option value="posta">Posta</option>
        </select>
      </div>

      {/* Close and Confirm Order Button */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={closeCheckout} // Close checkout when clicked
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          Back to Checkout
        </button>
        <button
          onClick={handleConfirmOrder}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
