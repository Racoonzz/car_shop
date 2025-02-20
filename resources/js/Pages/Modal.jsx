import React from 'react';

export default function Modal({ onClose }) {
    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}  // Close modal when clicking outside
        >
            <div
                className="bg-white p-6 rounded-md shadow-lg w-96 relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
            >
                <h3 className="text-xl font-semibold mb-4">Felhasználói felület</h3>
                <div className="mb-6">
                    {/* Buttons inside the modal */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => window.location.href = "http://car_shop.test/login"}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Bejelentkezés
                        </button>
                        <button
                            onClick={() => { /* Handle "Profil megtekintése" button click */ }}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Profil megtekintése
                        </button>
                        <button
                            onClick={() => window.location.href = "http://car_shop.test/register"} // register button
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        >
                            Még nincsen fiókod? Regisztrálj!
                        </button>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}  // Close the modal
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Bezárás
                    </button>
                </div>
            </div>


        </div>
    );
}
