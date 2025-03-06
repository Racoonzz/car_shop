import "../../../resources/css/style.css";
import bmwm from "../../../resources/img/bmwm.png";
import React, { useState, useEffect, useRef } from "react";
import ShowProducts from "./ShowProducts";
import Modal from './Modal';
import CartModal from './CartModal';
import { motion } from 'framer-motion';

export default function Home({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [isModelsOpen, setIsModelsOpen] = useState(false);
    const [models, setModels] = useState([]);
    const [isContactsOpen, setIsContactsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Refs for the dropdowns
    const modelsDropdownRef = useRef(null);
    const contactsDropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenWidth < 768) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [screenWidth]);

    useEffect(() => {
        axios.get('/products')
            .then(response => {
                const modelNames = [...new Set(response.data.map(product => product.models))];
                setModels(modelNames);
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    }, []);

    useEffect(() => {
        // Close models dropdown if clicked outside
        const handleClickOutside = (event) => {
            if (modelsDropdownRef.current && !modelsDropdownRef.current.contains(event.target)) {
                setIsModelsOpen(false);
            }
            if (contactsDropdownRef.current && !contactsDropdownRef.current.contains(event.target)) {
                setIsContactsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleModelsDropdown = () => {
        setIsModelsOpen(prev => !prev);
    };

    const toggleContactsDropdown = () => {
        setIsContactsOpen(prev => !prev);
    };

    const fetchProducts = () => {
        axios.get('/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
        setIsCartVisible(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
        setIsModalVisible(false);
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += product.quantity;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: product.quantity }];
            }
        });
    };

    const updateCart = (productId, quantity, productData) => {
        setCart((prevCart) => {
            if (quantity === 0) {
                return prevCart.filter((item) => item.id !== productId);
            }

            const existingItem = prevCart.find((item) => item.id === productId);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                );
            } else {
                return [...prevCart, { ...productData, id: productId, quantity }];
            }
        });
    };

    return (
        <div className="wrapper">
            <div className={sidebarOpen ? "sidebar" : "sidebar close"} style={{ zIndex: 20 }}>
                <div>
                    <a href="#" className="Home w-full" id="Home">
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

                    <li className="showMenu">
                        <div className="icon-link" id="Contacts" onClick={toggleContactsDropdown} ref={contactsDropdownRef}>
                            <a href="#">
                                <i className='bx bx-collection'></i>
                                <span className="link_name">Contact</span>
                            </a>
                            <i className={`bx bxs-chevron-${isContactsOpen ? 'up' : 'down'} arrow`}></i>
                        </div>

                        {isContactsOpen && (
                            <ul className="sub-menu bg-gray-800 text-white py-2 px-4 rounded-md mt-1 shadow-lg">
                                <li><a href="#" className="block py-1 hover:bg-gray-700">email</a></li>
                                <li><a href="#" className="block py-1 hover:bg-gray-700">phone</a></li>
                                <li><a href="#" className="block py-1 hover:bg-gray-700">fax</a></li>
                            </ul>
                        )}
                    </li>

                    <li className="showMenu">
                        <div className="icon-link" id="Models" onClick={toggleModelsDropdown} ref={modelsDropdownRef}>
                            <a href="#">
                                <i className='bx bx-car'></i>
                                <span className="link_name">Models</span>
                            </a>
                            <i className={`bx bxs-chevron-${isModelsOpen ? 'up' : 'down'} arrow`}></i>
                        </div>

                        {isModelsOpen && (
                            <ul className="sub-menu bg-gray-800 text-white py-2 px-4 rounded-md mt-1 shadow-lg">
                                <li className="text-white"><a className="link_name" href="#">Models</a></li>
                                {models.length > 0 ? (
                                    models.map((model, index) => (
                                        <li key={index}><a href="#" className="block py-1 hover:bg-gray-700">{model}</a></li>
                                    ))
                                ) : (
                                    <li>No models available</li>
                                )}
                            </ul>
                        )}
                    </li>

                    <li>
                        <div className="icon-link" id="Explore" onClick={fetchProducts}>
                            <a className="link_name" href="#" id="exploreLink">
                                <i className='bx bx-compass'></i>
                                <span className="link_name">Products</span>
                            </a>
                        </div>
                    </li>

                    <div className="sidebarCloser">
                        <li>
                            <div className="icon-link" id="openSidebar" onClick={() => setSidebarOpen((prev) => !prev)}>
                                <a className="link_name" href="#">
                                    <i className={sidebarOpen ? "bx bx-arrow-from-right" : "bx bx-arrow-from-left"} ></i>
                                </a>
                            </div>
                        </li>
                    </div>

                </ul>
            </div>

            <ShowProducts products={products} addToCart={addToCart} />

            {/* Modals with z-index higher than sidebar */}
            {isModalVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
                >
                    <Modal onClose={handleCloseModal} auth={auth} />
                </motion.div>
            )}

            {isCartVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
                >
                    <CartModal cart={cart} toggleCart={toggleCart} updateCart={updateCart} />
                </motion.div>
            )}
        </div>
    );
}
