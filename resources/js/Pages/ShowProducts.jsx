import React, { useState } from 'react';

export default function ShowProducts({ products, addToCart, deleteCart }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleAddToCartFromSmallCard = (product, e) => {
    e.stopPropagation();
    if (product.quantity > 0) {
      addToCart({ ...product, quantity: 1 });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleAddToCartFromModal = (product) => {
    if (product && quantity > 0 && product.quantity > 0) {
      addToCart({ ...product, quantity });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="text-center p-3 bg-[#e4e9f7] rounded-lg w-full overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer h-auto p-4"
            onClick={() => openModal(product)}
          >
            <h2 className="text-sm md:text-base font-semibold text-center bg-[#333] text-white py-2 px-4 rounded-md">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#555] mt-2 mb-2 h-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              {product.description}
            </p>
            <div className="w-full flex justify-center">
              <img src={`/storage/${product.pictureUrl}`} alt={product.name} className="w-full max-w-[180px] h-[180px] object-contain rounded-md" />
            </div>
            <div className="mt-auto flex flex-col items-center">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">{product.price} Ft</h3>
              {product.quantity !== 0 ? (
                <button
                  onClick={(e) => handleAddToCartFromSmallCard(product, e)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm w-full transition-all duration-150 transform active:scale-95"
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

      {modalOpen && selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={closeModal}>
          <div className="relative bg-white p-4 sm:p-6 rounded-lg max-w-4xl w-full h-auto flex flex-col items-center gap-6 shadow-lg overflow-auto max-h-[90vh] sm:max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-gray-800">X</button>
            <h2 className="bg-[#333] text-[#f0f0f0] py-2 px-4 rounded-md mb-4 w-full text-center text-sm sm:text-base md:text-lg lg:text-xl">
              {selectedProduct.name}
            </h2>
            <div className="flex flex-col items-center gap-6 w-full">
              <img src={selectedProduct.pictureUrl} alt={selectedProduct.name} className="max-w-[300px] w-full h-auto rounded-md shadow-md" />
              <div className="w-full flex flex-col items-center gap-4 px-4">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#555] overflow-auto max-h-[200px]">
                  {selectedProduct.description}
                </p>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{selectedProduct.price} Ft</h3>
                <div className="flex items-center gap-4">
                  <label className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold" htmlFor="quantity">Quantity:</label>
                  <input id="quantity" type="number" value={quantity} onChange={handleQuantityChange} min="1" max={selectedProduct.quantity} className="px-3 py-2 border rounded-md" />
                  <span className="text-sm text-gray-500">Available: {selectedProduct.quantity}</span>
                </div>
                <button onClick={() => handleAddToCartFromModal(selectedProduct)} className={`mt-4 px-6 py-3 rounded w-full ${selectedProduct.quantity === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-all duration-150 transform active:scale-95`} disabled={selectedProduct.quantity === 0}>Kosárba</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white p-3 rounded-lg shadow-lg opacity-90">
          <span>Product added to cart!</span>
        </div>
      )}
    </div>
  );
}
