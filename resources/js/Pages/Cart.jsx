import { Link } from '@inertiajs/react';
import React from 'react';

export default function Cart({ onClose, auth, onLogout }) {
    const logout = async () => {
        try {
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content;

            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken, // Include the CSRF token
                },
                credentials: 'same-origin',  // Ensure cookies are sent with the request
            });

            if (response.ok) {
                // Successful logout, redirect to login page
                window.location.href = '/login';
            } else {
                // If the server returns an error, show it
                console.error('Logout failed');
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Error during logout');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}  // Close Cart when clicking outside
        >
            <div
                className="bg-white p-6 rounded-md shadow-lg w-96 relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside Cart from closing it
            >
                <h3 className="text-xl font-semibold mb-4 text-center">kotsi</h3>
                <div className="mb-6">
                    {/* Buttons inside the Cart */}
                    <div className="flex flex-col gap-4 items-center">
                        {auth && auth.user ? (
                            <div className="flex flex-col items-center gap-4">
                                <span>Welcome, {auth.user.name}</span>
                                <button
                                    onClick={() => window.location.href = "/profile"}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Profil megtekintése
                                </button>
                                <Link href={route('logout')}
                                method="post"
                                    
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Kijelentkezés
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <button
                                    onClick={() => window.location.href = "/login"}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Bejelentkezés
                                </button>
                                <button
                                    onClick={() => window.location.href = "/register"}
                                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                >
                                    Még nincsen fiókod? Regisztrálj!
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}  // Close the Cart
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Bezárás
                    </button>
                </div>
            </div>
        </div>
    );
}

// halo