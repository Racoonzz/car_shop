import React, { useState } from 'react';
import ProductList from './ProductList';
import CartModal from './CartModal';

function App() {
  const [cart, setCart] = useState([]); // State to manage the cart items
  const [showCart, setShowCart] = useState(false); // State to toggle the cart modal

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to toggle the cart modal visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  

  return (
    <div className="App">
      <button onClick={toggleCart} className="cart-button">
        View Cart ({cart.length})
      </button>

      {/* Product List */}
      <ProductList products={products} addToCart={addToCart} />

      {/* Cart Modal */}
      {showCart && <CartModal cart={cart} toggleCart={toggleCart} />}
    </div>
  );
}

export default App;
