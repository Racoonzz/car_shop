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
    const [isModelsOpen, setIsModelsOpen] = useState(false); // State for models dropdown visibility
    const [models, setModels] = useState([]); // State to store model data
    const [isContactsOpen, setIsContactsOpen] = useState(false); // State for contacts dropdown visibility

    // Function to fetch models from the backend
    useEffect(() => {
        axios.get('/products')
            .then(response => {
                // Extract unique model names from the products data
                const modelNames = [...new Set(response.data.map(product => product.models))];
                setModels(modelNames);
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    }, []);

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

 

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                // If product exists, increase its quantity by the selected amount
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += product.quantity;  // Increment by the selected quantity
                return updatedCart;
            } else {
                // If product doesn't exist, add it with the selected quantity
                return [...prevCart, { ...product, quantity: product.quantity }];
            }
        });
    };

    const updateCart = (productId, quantity, productData) => {
        setCart((prevCart) => {
            // If quantity is 0, remove the product
            if (quantity === 0) {
                return prevCart.filter((item) => item.id !== productId);
            }

            // Check if product exists in the cart
            const existingItem = prevCart.find((item) => item.id === productId);

            if (existingItem) {
                // If product exists, update its quantity
                return prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                );
            } else {
                // If product doesn't exist, add it to the cart
                return [...prevCart, { ...productData, id: productId, quantity }];
            }
        });
    };

    // Function to toggle the models dropdown
    const toggleModelsDropdown = () => {
        setIsModelsOpen(!isModelsOpen);
    };

    // Function to toggle the contacts dropdown
    const toggleContactsDropdown = () => {
        setIsContactsOpen(!isContactsOpen);
    };

    return (
        <div className="wrapper">
            <div className={sidebarOpen ? "sidebar" : "sidebar close"}>
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

                    
                    <li  className={isContactsOpen ? 'showMenu' : ''}>
                        <div className="icon-link" id="Contacts" onClick={toggleContactsDropdown}>
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

                   
                    <li className={isModelsOpen ? 'showMenu' : ''}>
                        <div className="icon-link" id="Models" onClick={toggleModelsDropdown}>
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

            {isModalVisible && <Modal onClose={handleCloseModal} auth={auth} />}

            {isCartVisible && <CartModal cart={cart} toggleCart={toggleCart} updateCart={updateCart} />}
        </div>
    );
};
