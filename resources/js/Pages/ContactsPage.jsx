import React from 'react';

export default function ContactsPage() {
    return (
        <div className="contacts-content overflow-y-auto px-4 sm:px-6 py-6">
            <section className="contact-info mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-700">Feel free to reach out to us via email or phone.</p>

                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-700">
                        📧 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pap.lacus@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">pap.lacus@gmail.com</a>
                    </p>
                    <p className="text-gray-700">
                        📧 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@bmwcompany.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">janka email</a>
                    </p>
                </div>

                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-700">📞 +36 70 617 8428</p>
                    <p className="text-gray-700">📞 janka telefon</p>
                </div>
            </section>

            <section className="about-us">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
                <p className="text-gray-700">
                    We are passionate about providing high-quality BMW products and services. Our team of experts is dedicated to helping you find the best solutions for your automotive needs.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <img src={"storage/img/bmw_showroom.jpg"} className="rounded-lg shadow-md" />
                    <img src="https://source.unsplash.com/400x300/?team,workshop" alt="Our Team" className="rounded-lg shadow-md" />
                </div>
            </section>
        </div>
    );
}
