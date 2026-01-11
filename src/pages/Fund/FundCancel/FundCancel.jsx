import React from 'react';
import { Link } from 'react-router';

const FundCancel = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-100 px-4 sm:px-6 relative overflow-hidden py-20 transition-colors duration-300">
      {/* Background Glows for "Warning/Alert" Vibe */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-error/10 rounded-full blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="relative z-10 max-w-xl w-full animate-fadeIn">
        {/* Main Card */}
        <div className="bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative Danger Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-error via-orange-500 to-error"></div>

          {/* Cancel Icon */}
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 rounded-full bg-error/20 animate-ping"></div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-error flex items-center justify-center shadow-xl shadow-error/30">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-error-content"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black mb-4 text-base-content tracking-tighter">
            Fund <span className="text-error">Cancelled</span>
          </h1>

          {/* Message */}
          <p className="text-base-content opacity-70 text-base sm:text-lg mb-8 leading-relaxed px-4">
            The donation process was interrupted.{' '}
            <span className="font-bold">No charges</span> were applied to your
            account. Your support means a lot, feel free to try again.
          </p>

          {/* Info Box */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 mb-8 text-left">
            <h3 className="text-sm font-black uppercase tracking-widest opacity-40 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-error rounded-full"></span>
              Common Reasons
            </h3>
            <ul className="space-y-3">
              <ReasonItem text="The payment window was closed manually." />
              <ReasonItem text="Internet connection was lost during processing." />
              <ReasonItem text="The 'Back' button was pressed on the checkout." />
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/give-fund"
              className="px-8 py-4 bg-primary text-primary-content font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              Try Again
            </Link>

            <Link
              to="/"
              className="px-8 py-4 bg-base-300 text-base-content font-black rounded-2xl hover:bg-base-content/10 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              Go Home
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-10 pt-8 border-t border-base-300">
            <p className="text-xs font-bold opacity-50 mb-3 uppercase tracking-tighter">
              Facing issues with payment?
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-error font-black text-sm uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="border-b-2 border-error/30 group-hover:border-error transition-all">
                Contact Support
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

// Sub-component for clean reason list
const ReasonItem = ({ text }) => (
  <li className="flex items-center gap-3 text-sm font-bold opacity-70 text-base-content">
    <div className="w-5 h-5 rounded-md bg-error/10 flex items-center justify-center shrink-0">
      <svg
        className="w-3.5 h-3.5 text-error"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    {text}
  </li>
);

export default FundCancel;
