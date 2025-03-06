import React, { useState } from 'react';

export default function ShowProducts({ products, addToCart }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const openModal = (product) => {
        setSelectedProduct(product);
        setQuantity(1); // Reset quantity when opening the modal
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleQuantityChange = (e) => {
        // Ensure the quantity is within bounds and is a number
        const value = Math.max(1, Math.min(Number(e.target.value), selectedProduct.quantity));
        setQuantity(value);
    };

    const handleAddToCart = () => {
        if (selectedProduct && quantity > 0) {
            addToCart({ ...selectedProduct, quantity });
        }
    };

    return (
        <div className="products text-center p-3 bg-[#e4e9f7] rounded-lg w-full overflow-y-auto transition-transform duration-300">
            {/* Product grid container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {products.length > 0 && (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="p-2 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => openModal(product)}
                        >
                            <h2 className="bg-[#333] text-[#f0f0f0] py-2 px-4 rounded-md mb-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                {product.name}
                            </h2>
                            <p className="font-variant-small-caps text-[#555] text-xs sm:text-sm md:text-base lg:text-lg my-1">{product.description}</p>
                            <img
                                src={product.pictureUrl}
                                alt={product.name}
                                className="w-[70%] max-w-[250px] rounded-md shadow-md transition-transform duration-300 mx-auto mb-2"
                            />
                            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2">{product.price} Ft</h3>
                            {product.quantity !== 0 ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart({ ...product, quantity: 1 });
                                    }}
                                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Kosárba
                                </button>
                            ) : (
                                <span>Nem rendelhető</span>
                            )}
                        </div>
                    ))
                )}
            </div>

            {modalOpen && selectedProduct && (
                <div
                    className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="modal-content bg-white p-6 rounded-lg max-w-4xl w-full h-auto flex flex-col items-center gap-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Product Name */}
                        <h2 className="bg-[#333] text-[#f0f0f0] py-2 px-4 rounded-md mb-4 w-full text-center text-sm sm:text-base md:text-lg lg:text-xl">
                            {selectedProduct.name}
                        </h2>

                        {/* Product Image and Info Section */}
                        <div className="flex flex-col items-center gap-6 w-full">
                            {/* Product Image */}
                            <img
                                src={selectedProduct.pictureUrl}
                                alt={selectedProduct.name}
                                className="max-w-[350px] w-full h-auto rounded-md shadow-md"
                            />

                            {/* Product Details */}
                            <div className="w-full flex flex-col items-center gap-4">
                                {/* Product Description */}
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#555] overflow-auto max-h-[200px]">{selectedProduct.description}</p>

                                {/* Product Price */}
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{selectedProduct.price} Ft</h3>

                                {/* Quantity Picker */}
                                <div className="flex items-center gap-4">
                                    <label className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold" htmlFor="quantity">Quantity:</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        max={selectedProduct.quantity}
                                        className="px-3 py-2 border rounded-md"
                                    />
                                    <span className="text-sm text-gray-500">Available: {selectedProduct.quantity}</span>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={selectedProduct.quantity === 0}
                                >
                                    Kosárba
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-gray-800"
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    );
}
