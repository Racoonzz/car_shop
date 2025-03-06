import { Link } from '@inertiajs/react';
import React from 'react';
import { motion } from 'framer-motion';

export default function Modal({ onClose, auth }) {
    return (
        <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-60" // Increased z-index to ensure modal stays on top
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full sm:w-96 max-w-[90%] max-h-[90vh] overflow-auto relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Felhasználói felület</h3>
                <div className="mb-6">
                    <div className="flex flex-col gap-4 items-center">
                        {auth && auth.user ? (
                            <motion.div 
                                className="flex flex-col items-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="text-gray-700 text-sm sm:text-base">Welcome, {auth.user.name}</span>
                                <Link
                                    href="/profile"
                                    className="px-4 py-2 text-sm sm:text-base bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Profil megtekintése
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    className="px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Kijelentkezés
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div 
                                className="flex flex-col items-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Bejelentkezés
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm sm:text-base bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                                >
                                    Még nincsen fiókod? Regisztrálj!
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <motion.button
                        onClick={onClose}  
                        className="px-4 py-2 text-sm sm:text-base bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Bezárás
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
