import "../../../resources/css/style.css";
import bmwm from "../../../resources/img/bmwm.png";
import React, { useState, useEffect, useRef } from "react";
import ShowProducts from "./ShowProducts";
import Modal from './Modal';
import CartModal from './CartModal';
import { motion } from 'framer-motion';
import HomeContent from "./HomeContent";
import axios from "axios";

export default function Home({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [isModelsOpen, setIsModelsOpen] = useState(false);
    const [models, setModels] = useState([]);
    const [isContactsOpen, setIsContactsOpen] = useState(false);  // Contacts dropdown state
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [currentContent, setCurrentContent] = useState("home");
    const [selectedModel, setSelectedModel] = useState(null); // New state for selected model

    const modelsDropdownRef = useRef(null);
    const contactsDropdownRef = useRef(null); // Ref for contacts dropdown

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setSidebarOpen(screenWidth >= 768);
    }, [screenWidth]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                const modelNames = [...new Set(response.data.map(product => product.models))];
                setModels(modelNames);
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching models:', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelsDropdownRef.current && !modelsDropdownRef.current.contains(event.target)) {
                setIsModelsOpen(false);
            }
            if (contactsDropdownRef.current && !contactsDropdownRef.current.contains(event.target)) {
                setIsContactsOpen(false); // Close contacts dropdown when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleModelsDropdown = () => setIsModelsOpen(prev => !prev);
    const toggleContactsDropdown = () => setIsContactsOpen(prev => !prev); // Toggle contacts dropdown

    const fetchProducts = () => {
        axios.get('/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
        setIsCartVisible(false);
    };

    const handleCloseModal = () => setIsModalVisible(false);
    const toggleCart = () => {
        setIsCartVisible(prev => !prev);
        setIsModalVisible(false);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
          const productInDatabase = products.find((p) => p.id === product.id); // Find the product in the database
          const maxQuantity = productInDatabase ? productInDatabase.quantity : 1; // Get the available stock
      
          // Check if the product is already in the cart
          const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      
          if (existingProductIndex >= 0) {
            // Product is already in the cart
            const updatedCart = [...prevCart];
            const newQuantity = updatedCart[existingProductIndex].quantity + (product.quantity || 1);
      
            // Ensure the new quantity does not exceed the available stock
            updatedCart[existingProductIndex].quantity = Math.min(newQuantity, maxQuantity);
            return updatedCart;
          } else {
            // Product is not in the cart
            const quantity = Math.min(product.quantity || 1, maxQuantity); // Ensure the quantity does not exceed the available stock
            return [...prevCart, { ...product, quantity }];
          }
        });
      };

    const updateCart = (id, newQuantity) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;

        const maxQuantity = product.quantity;
        const updatedQuantity = Math.min(newQuantity, maxQuantity);

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: updatedQuantity } : item
            )
        );
    };

    const deleteCart = ()=>{
        setCart([]);
    }

    const handleHomeClick = () => {
        setCurrentContent("home");
        setSelectedModel(null); // Reset model selection when going back home
    };

    const handleProductClick = () => {
        fetchProducts();
        setCurrentContent("products");
        setSelectedModel(null); // Reset model filter when exploring all products
    };

    const handleModelClick = (model) => {
        setSelectedModel(model);
        setCurrentContent("products");
    };

    return (
        <div className="wrapper">
            <div className={sidebarOpen ? "sidebar" : "sidebar close"} style={{ zIndex: 20 }}>
                <div>
                    <a href="#" className="Home w-full" id="Home" onClick={handleHomeClick}>
                        <img src={bmwm} alt="" id="bmwm" />
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
                    </li>

                    <li>
                        <div className="icon-link" id="Cart" onClick={toggleCart}>
                            <a href="#">
                                <i className='bx bx-cart'></i>
                                <span className="link_name">Cart</span>
                            </a>
                        </div>
                    </li>

                    {/* Models Dropdown */}
                    <li className="showMenu" ref={modelsDropdownRef}>
                        <div className="icon-link" id="Models" onClick={toggleModelsDropdown}>
                            <a href="#">
                                <i className='bx bx-car'></i>
                                <span className="link_name">Models</span>
                            </a>
                            <i className={`bx bxs-chevron-${isModelsOpen ? 'up' : 'down'} arrow`}></i>
                        </div>
                        {isModelsOpen && (
                            <ul className="sub-menu bg-gray-800 text-white py-2 px-4 rounded-md mt-1 shadow-lg">
                                {models.length > 0 ? (
                                    models.map((model, index) => (
                                        <li key={index}>
                                            <a href="#" className="block py-1 hover:bg-gray-700" onClick={() => handleModelClick(model)}>
                                                {model}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li>No models available</li>
                                )}
                            </ul>
                        )}
                    </li>

                    {/* Contacts Dropdown */}
                    <li className="showMenu" ref={contactsDropdownRef}>
                        <div className="icon-link" id="Contacts" onClick={toggleContactsDropdown}>
                            <a href="#">
                                <i className='bx bx-phone'></i>
                                <span className="link_name">Contacts</span>
                            </a>
                            <i className={`bx bxs-chevron-${isContactsOpen ? 'up' : 'down'} arrow`}></i>
                        </div>
                        {isContactsOpen && (
                            <ul className="sub-menu bg-gray-800 text-white py-2 px-4 rounded-md mt-1 shadow-lg">
                                <li>
                                    <a href="#" className="block py-1 hover:bg-gray-700">Email</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-1 hover:bg-gray-700">Phone Number</a>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <div className="icon-link" id="Explore" onClick={handleProductClick}>
                            <a className="link_name" href="#" id="exploreLink">
                                <i className='bx bx-compass'></i>
                                <span className="link_name">Products</span>
                            </a>
                        </div>
                    </li>

                    <div className="sidebarCloser">
                        <li>
                            <div className="icon-link" id="openSidebar" onClick={() => setSidebarOpen(prev => !prev)}>
                                <a className="link_name" href="#">
                                    <i className={sidebarOpen ? "bx bx-arrow-from-right" : "bx bx-arrow-from-left"} ></i>
                                </a>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>

            {/* Main Content */}
            {currentContent === "home" && <HomeContent />}
            {currentContent === "products" && (
                <ShowProducts
                    products={selectedModel ? products.filter(product => product.models === selectedModel) : products}
                    addToCart={addToCart}
                    deleteCart={deleteCart}
                />
            )}

            {/* Modals */}
            {isModalVisible && (
                <motion.div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <Modal onClose={handleCloseModal} auth={auth} />
                </motion.div>
            )}
            {isCartVisible && (
                <motion.div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                    <CartModal
                        cart={cart}
                        toggleCart={toggleCart}
                        updateCart={updateCart}
                        deleteCart={deleteCart}
                        products={products} // Pass the products array
                    />
                </motion.div>
            )}
        </div>
    );
}
