import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const AdminLayout = ({ header, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{header}</h2>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              Manage
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link
                  href="/admin/products"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Product Management
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
