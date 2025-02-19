import "../../../resources/css/style.css";
import bmwm from "../../../resources/img/bmwm.png";
import React, { useState } from "react";
import ShowProducts from "./ShowProducts";

export default function Home() {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [products, setProducts] = useState([]);


    const fetchProducts = () => {
        axios
            .get('/products') // Backend route hívása
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Hiba történt a lekérdezés során:', error));
    };
    return (
        <>
            <div className="wrapper">
                <div className={sidebarOpen ? "sidebar" : "sidebar close"}>

                    <div className="">
                        <a href="#" className="Home w-full" id="Home">
                            <img src={bmwm} alt="" srcSet="" id="bmwm" />
                        </a>
                        <span className="logo_name">home</span>

                    </div>


                    <ul className="nav-links">


                        <li>
                            <div className="icon-link" id="Cart">
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
                                <li><a className="link_name" href="#" target="_self">Contact</a></li>

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
                        <li >
                            <div className="icon-link" id="openSidebar" onClick={() => setSidebarOpen((prev) => !prev)}  >
                                <a className="link_name" href="#" id="openSidebar">
                                <i className={sidebarOpen ? "bx bx-arrow-from-right" : "bx bx-arrow-from-left"} ></i>
                                    <span className="link_name"></span>
                                </a>
                            </div>
                            
                        </li>
                    </div>
                    
                    </ul>

                    


                </div>
               
            <ShowProducts products={products}/>
            </div>
            
        </>
    );

}

