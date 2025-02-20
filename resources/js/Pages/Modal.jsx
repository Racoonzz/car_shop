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
        <h3 className="text-xl font-semibold mb-4">Modal Title</h3>
        <p className="mb-6">This is the content of the modal.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}  // Close the modal
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={onClose}  // Close the modal (or you can add custom functionality here)
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
