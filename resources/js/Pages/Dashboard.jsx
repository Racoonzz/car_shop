import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import "../../../resources/css/style.css";

export default function Dashboard({ auth }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    üdvözöllek {auth.user.name} !
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <button onClick={fetchProducts}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >
                                Termékek betöltése
                            </button>
                            <div id="home" className="products">
                                {products.length > 0 && (
                                    products.map((product) => (
                                        <div key={product.id} className="listing">
                                            <h2>{product.name}</h2>
                                            <p>{product.description}</p>
                                            <img src={product.pictureUrl} alt={product.name} />
                                            <h3>{product.price} Ft</h3>
                                            {product.quantity !== 0 ? (
                                                <a id={product.id} className="addToCart">Kosárba</a>
                                            ) : (
                                                <span>Nem rendelhető</span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {auth.user.role === 'admin' && (
                                <button 
                                    className="text-blue-500"
                                    onClick={() => Inertia.visit(route('admin.dashboard'))}
                                >
                                    Admin Dashboard megnyitása
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
