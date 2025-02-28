import "../../../resources/css/style.css";
import bmwm from "../../../resources/img/bmwm.png";
import React, { useState, useEffect } from "react";
import ShowProducts from "./ShowProducts";
import Modal from './Modal';
import CartModal from './CartModal';

export default function Home({ auth }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);  // Modal state
    const [isCartVisible, setIsCartVisible] = useState(false);  // Cart state
    const [cart, setCart] = useState([]); // Cart state

    // Function to fetch products
    const fetchProducts = () => {
        axios
            .get('/products')  // Backend route call
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    };

    // Function to open modal
    const handleOpenModal = () => {
        setIsModalVisible(true);
        setIsCartVisible(false);  // Close cart modal when profile modal opens
    };

    // Function to close modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // Function to toggle the cart modal visibility
    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
        setIsModalVisible(false);  // Close profile modal when cart modal opens
    };

    // Function to fetch cart data
    const fetchCart = () => {
        axios
            .get('/cart')  // Backend route call
            .then((response) => setCart(response.data))
            .catch((error) => console.error('Error fetching cart:', error));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                // If product exists, increase its quantity
                const updatedCart = [...prevCart];

                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                // If product doesn't exist, add it with a default quantity of 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateCart = (productId, quantity) => {
        if (quantity === 0) {
          setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
          return;
        }
        setCart((prevCart) => {
          return prevCart.map((item) => 
            item.id === productId ? { ...item, quantity } : item
          );
        });
      };

    return (
        <>
            <div className="wrapper">
                <div className={sidebarOpen ? "sidebar" : "sidebar close"}>
                    <div className="">
                        <a href="#" className="Home w-full" id="Home">
                            <img src={bmwm} alt="" srcSet="" id="bmwm" />
                        </a>
                    </div>

                    <ul className="nav-links">
                        <li>
                            <div className="icon-link" id="User" onClick={handleOpenModal}>
                                <a href="#">
                                    <i className='bx bx-user-circle'></i>
                                    <span className="link_name">{auth.user ? auth.user.name : "jelentkezz be"}</span>
                                </a>
                            </div>
                            <ul className="sub-menu blank">
                                <li><a className="link_name" href="#">UserLoginRegister</a></li>
                            </ul>
                        </li>

                        <li>
                            <div className="icon-link" id="Cart" onClick={toggleCart}>
                                <a href="#">
                                    <i className='bx bx-cart'></i>
                                    <span className="link_name">Cart</span>
                                </a>
                            </div>
                            <ul className="sub-menu blank">
                                <li><a className="link_name" href="#">Cart</a></li>
                            </ul>
                        </li>

                        <li>
                            <div className="icon-link" id="Contacts">
                                <a href="#">
                                    <i className='bx bx-collection'></i>
                                    <span className="link_name">Contact</span>
                                </a>
                                <i className='bx bxs-chevron-down arrow'></i>
                            </div>
                            <ul className="sub-menu">
                                <li><a className="link_name" href="#">Contact</a></li>

                                <li>
                                    <a href="#">email</a>
                                </li>

                                <li>
                                    <a href="#">phone</a>
                                </li>

                                <li>
                                    <a href="#">fax</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <div className="icon-link" id="Models">
                                <a href="#">
                                    <i className='bx bx-car'></i>
                                    <span className="link_name">Models</span>
                                </a>
                                <i className='bx bxs-chevron-down arrow'></i>
                            </div>
                            <ul className="sub-menu">
                                <li><a className="link_name" href="#">models</a></li>
                                <li><a href="#" className="E30" id="E30">E30</a></li>
                                <li><a href="#" className="E34" id="E34">E34</a></li>
                                <li><a href="#" className="E36" id="E36">E36</a></li>
                                <li><a href="#" className="E39" id="E39">E39</a></li>
                                <li><a href="#" className="E46" id="E46">E46</a></li>
                            </ul>
                        </li>

                        <li>
                            <div className="icon-link" id="Explore" onClick={fetchProducts}>
                                <a className="link_name" href="#" id="exploreLink">
                                    <i className='bx bx-compass'></i>
                                    <span className="link_name">Products</span>
                                </a>
                            </div>
                            <ul className="sub-menu blank">
                                <li>
                                    <a className="link_name" href="#">Products</a>
                                </li>
                            </ul>
                        </li>

                        <div className="sidebarCloser">
                            <li>
                                <div className="icon-link" id="openSidebar" onClick={() => setSidebarOpen((prev) => !prev)}>
                                    <a className="link_name" href="#" id="openSidebar">
                                        <i className={sidebarOpen ? "bx bx-arrow-from-right" : "bx bx-arrow-from-left"} ></i>
                                        <span className="link_name"></span>
                                    </a>
                                </div>
                            </li>
                        </div>

                    </ul>

                </div>


                <ShowProducts products={products} addToCart={addToCart} />


                {isModalVisible && <Modal onClose={handleCloseModal} auth={auth} />}


                {isCartVisible && <CartModal cart={cart} toggleCart={toggleCart} updateCart={updateCart} />}
            </div>
        </>
    );
};
