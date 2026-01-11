import React from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import logo from '../../assets/blood-logo.png'; // image import

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen transition-all duration-500 bg-linear-to-b from-red-50 to-white dark:from-[#150c0c] dark:to-[#0d0b0b] ">
      <header>
        <Navbar />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-7xl md:text-9xl font-extrabold text-red-600 animate-pulse">
            4
          </h1>
          <img
            src={logo}
            alt="blood logo"
            className="w-16 md:w-24 animate-pulse"
          />
          <h1 className="text-7xl md:text-9xl font-extrabold text-red-600 animate-pulse">
            4
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition"
        >
          Back to Home
        </button>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default NotFound;
