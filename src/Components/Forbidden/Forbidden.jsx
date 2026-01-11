import React from 'react';
import { FaShieldAlt, FaLock, FaHome, FaTachometerAlt } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4 sm:p-6">
      {/* Card */}
      <div className="bg-base-200/80 backdrop-blur-xl border border-base-300 rounded-3xl p-6 sm:p-12 shadow-lg w-full max-w-md sm:max-w-lg text-center">
        {/* Icons */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            {/* Circular Background Glow */}
            <div className="absolute inset-0 w-full h-full bg-red-500/20 rounded-full animate-pulse" />

            {/* Shield Icon */}
            <FaShieldAlt className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 text-red-500 transition-transform duration-300 z-10" />

            {/* Lock Icon on top with bounce */}
            <FaLock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 text-red-400 animate-bounce z-20 shadow-lg" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-red-700 dark:text-red-400 mb-4">
          Access Forbidden
        </h1>

        {/* Message */}
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          You don’t have permission to access this page. Please contact an
          administrator if you believe this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <FaHome className="w-4 sm:w-5 h-4 sm:h-5" />
            Return Home
          </a>
          <a
            href="/dashboard"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-base-content text-base-100 rounded-xl font-semibold hover:bg-primary transition flex items-center justify-center gap-2"
          >
            <FaTachometerAlt className="w-4 sm:w-5 h-4 sm:h-5" />
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
