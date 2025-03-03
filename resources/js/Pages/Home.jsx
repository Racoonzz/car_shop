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
    const [isModelsOpen, setIsModelsOpen] = useState(false); // State for dropdown visibility
    const [models, setModels] = useState([]); // State to store model data
    const [selectedModel, setSelectedModel] = useState('');


    // useEffect(() => {
    //     // Fetch the products data from the API
    //     axios
    //         .get('/api/products')  // Ensure this is the correct endpoint
    //         .then((response) => {
    //             setProducts(response.data);  // Store products data in the state
    //         })
    //         .catch((error) => console.error('Error fetching products:', error));
    // }, []);


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

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setDropdownOpen(false); // Close dropdown when a model is selected
    };


    // Function to toggle the models dropdown
    const toggleModelsDropdown = () => {
        setIsModelsOpen(!isModelsOpen);
    };


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
        // .get('/cart')  // Backend route call
        // .then((response) => setCart(response.data))
        // .catch((error) => console.error('Error fetching cart:', error));
    };

    // useEffect(() => {
    //     fetchCart();
    // }, []);

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

                        <li className={isModelsOpen ? 'showMenu' : ''}>
                            <div className="icon-link" id="Models" onClick={toggleModelsDropdown}>
                                <a href="#">
                                    <i className='bx bx-car'></i>
                                    <span className="link_name">Models</span>
                                </a>
                                <i className={`bx bxs-chevron-${isModelsOpen ? 'up' : 'down'} arrow`}></i>
                            </div>
                            {isModelsOpen && (
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Models</a></li>
                                    {models.length > 0 ? (
                                        models.map((model, index) => (
                                            <li key={index}><a href="#">{model}</a></li>
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
