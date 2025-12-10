import React from 'react';
import logo from '../../assets/blood-logo.png';

const LoadingSpin = () => {
  return (
    <div>
      <div className="py-10 flex flex-col items-center justify-center">
        {/* Glowing Ring */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-red-600/20 blur-2xl animate-pulse"></div>

          {/* Spinning Ring */}
          <div className="w-28 h-28 rounded-full border-4 border-red-300 border-t-red-600 animate-spin"></div>

          {/* Logo */}
          <img
            src={logo}
            alt="Loading Logo"
            className="absolute w-14 h-14 object-contain animate-pulse drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]"
          />
        </div>

        {/* Loading Dots */}
        <div className="flex gap-3 mt-8">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        {/* Text */}
        <p className="mt-6 text-xl font-semibold text-red-700 dark:text-red-400 tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpin;
