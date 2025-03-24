import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const OrderShow = ({ order }) => {
  // Helper function to format prices in HUF
  const formatPrice = (price) => {
    return `${price.toLocaleString('hu-HU')} Ft`;
  };

  // Shipping options corresponding to the IDs
  const shippingOptions = {
    1: 'Standard Shipping (3-5 business days)',
    2: 'Express Shipping (1-2 business days)',
    3: 'SameDay Delivery',
  };

  // Payment options corresponding to the IDs
  const paymentOptions = {
    1: 'Credit Card',
    2: 'Bank Transfer',
    3: 'Cash on Delivery',
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
            <p><strong>Shipping Method:</strong> {shippingOptions[order.shippingMethod]}</p>
            <p><strong>Payment Method:</strong> {paymentOptions[order.paymentMethod]}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString('hu-HU')}</p>
            <p><strong>Order Status:</strong> {order.finalised === 1 ? 'Completed' : 'Pending'}</p>
          </div>
        </div>

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
    </AdminLayout>
  );
};

export default OrderShow;
