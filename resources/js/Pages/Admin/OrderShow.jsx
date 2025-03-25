import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import axios from 'axios';

const OrderShow = ({ order }) => {
  // Helper function to format prices in HUF
  const formatPrice = (price) => {
    return `${price.toLocaleString('hu-HU')} Ft`;
  };

  const [orderStatus, setOrderStatus] = useState(order.finalised);  // Assuming order.finalised is 0 for Pending, 1 for Shipping
  const [isPopupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message

  const handleStatusChange = async () => {
    try {
      // Update the order status to 'Shipping' by setting finalised to 1
      const response = await axios.put(`/admin/orders/${order.id}`, {
        finalised: 1, // Set finalised to 1 (Shipping)
      });

      // Update the status in UI to reflect the change
      setOrderStatus(1);  // Assuming you have a state to track the order status
      
      // Show the success popup
      setPopupMessage('Order status updated to Shipping');
      setPopupVisible(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    } catch (error) {
      // Show the error popup
      setPopupMessage('Error updating order status');
      setPopupVisible(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);

      console.error(error);
    }
  };

  return (
    <AdminLayout header={<h2 className="font-semibold text-xl text-gray-800">Order Details</h2>}>
      <div className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>

        {/* Order details */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
          <div className="space-y-2">
            <p><strong>First Name:</strong> {order.firstName}</p>
            <p><strong>Last Name:</strong> {order.lastName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            <p><strong>Shipping City:</strong> {order.shippingCity}</p>
            <p><strong>Shipping Method:</strong> {order.shippingMethod || 'N/A'}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod || 'N/A'}</p>
            <p><strong>Order Date:</strong> {order.created_at ? new Date(order.created_at).toLocaleString('hu-HU') : 'Invalid Date'}</p>
            <p><strong>Order Status:</strong> {orderStatus === 1 ? 'Shipping' : 'Pending'}</p>
          </div>
        </div>

        {/* Button to change status (only if orderStatus is 0 - Pending) */}
        {orderStatus === 0 && (
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <button
              onClick={handleStatusChange}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Mark as Shipping
            </button>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            {/* Table for larger screens */}
            <table className="min-w-full border-collapse hidden sm:table">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Product</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.order_details && order.order_details.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        <img
                          src={`/storage/${item.product.pictureUrl}`}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-md mr-2"
                        />
                        <div>
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-sm text-gray-500">{item.product.models}</p>
                          <p className="text-sm text-gray-500">{item.product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                    <td className="px-4 py-2 border-b">{formatPrice(item.price)}</td>
                    <td className="px-4 py-2 border-b">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile-friendly list for smaller screens */}
            <div className="sm:hidden space-y-4">
              {order.order_details && order.order_details.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <img
                      src={`/storage/${item.product.pictureUrl}`}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-md mr-2"
                    />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.product.models}</p>
                      <p className="text-sm text-gray-500">{item.product.description}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> {formatPrice(item.price)}</p>
                    <p><strong>Total:</strong> {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-2">Total Price</h2>
          <p className="text-xl font-bold">{formatPrice(order.totalPrice)}</p>
        </div>
      </div>

      {/* Custom Popup Notification */}
      {isPopupVisible && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white p-3 rounded-lg shadow-lg opacity-90">
          <span>{popupMessage}</span>
        </div>
      )}
    </AdminLayout>
  );
};

export default OrderShow;
