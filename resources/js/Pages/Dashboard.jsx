import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {

    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios
            .get('/products') // Backend route hívása
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Hiba történt a lekérdezés során:', error));
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
                            {products.length > 0 && (
                                <ul className="mt-6">
                                    {products.map((product) => (
                                        <li key={product.id} className="border-b py-2">
                                            <strong>{product.category.name} - {product.name}</strong> - {product.price} Ft
                                        </li>
                                    ))}
                                </ul>
                            )}

                           
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
