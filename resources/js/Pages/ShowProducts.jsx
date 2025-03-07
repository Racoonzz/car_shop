import React, { useState } from 'react';

export default function ShowProducts({ products, addToCart }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(Number(e.target.value), selectedProduct.quantity));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      addToCart({ ...selectedProduct, quantity });
    }
  };

  return (
    <div className="products text-center p-3 bg-[#e4e9f7] rounded-lg w-full overflow-y-auto">
      {/* Responsive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer h-auto p-4"
            onClick={() => openModal(product)}
          >
            {/* Product Name */}
            <h2 className="text-sm md:text-base font-semibold text-center bg-[#333] text-white py-2 px-4 rounded-md">
              {product.name}
            </h2>

            {/* Fixed Description (Limited to 1.5 Lines) */}
            <p className="text-xs sm:text-sm text-[#555] mt-2 mb-2 h-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              {product.description}
            </p>

            {/* Square Image - Responsive */}
            <div className="w-full flex justify-center">
              <img
                src={product.pictureUrl}
                alt={product.name}
                className="w-full max-w-[180px] h-[180px] object-cover rounded-md"
              />
            </div>

            {/* Price and Button - Always at Bottom */}
            <div className="mt-auto flex flex-col items-center">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">{product.price} Ft</h3>
              {product.quantity !== 0 ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening when clicking button
                    addToCart({ ...product, quantity: 1 });
                  }}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm w-full"
                >
                  Kosárba
                </button>
              ) : (
                <span className="text-sm text-gray-500">Nem rendelhető</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div
          className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="modal-content relative bg-white p-6 rounded-lg max-w-4xl w-full h-auto flex flex-col items-center gap-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Inside Modal */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-gray-800"
            >
              X
            </button>

            <h2 className="bg-[#333] text-[#f0f0f0] py-2 px-4 rounded-md mb-4 w-full text-center text-sm sm:text-base md:text-lg lg:text-xl">
              {selectedProduct.name}
            </h2>
            <div className="flex flex-col items-center gap-6 w-full">
              <img
                src={selectedProduct.pictureUrl}
                alt={selectedProduct.name}
                className="max-w-[300px] w-full h-auto rounded-md shadow-md"
              />
              <div className="w-full flex flex-col items-center gap-4">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#555] overflow-auto max-h-[200px]">
                  {selectedProduct.description}
                </p>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                  {selectedProduct.price} Ft
                </h3>
                <div className="flex items-center gap-4">
                  <label
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold"
                    htmlFor="quantity"
                  >
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={selectedProduct.quantity}
                    className="px-3 py-2 border rounded-md"
                  />
                  <span className="text-sm text-gray-500">
                    Available: {selectedProduct.quantity}
                  </span>
                </div>
                <button
                  onClick={handleAddToCart} // Now properly defined!
                  className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                  disabled={selectedProduct.quantity === 0}
                >
                  Kosárba
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
