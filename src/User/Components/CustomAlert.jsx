import React from "react";
import ReactDOM from "react-dom";

const CustomAlert = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
            {title}
          </h3>
          
          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            {message}
          </p>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CustomAlert;