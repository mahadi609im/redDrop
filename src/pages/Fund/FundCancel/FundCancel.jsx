import React from 'react';
import { Link } from 'react-router';

const FundCancel = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-rose-50 to-pink-50 dark:from-[#1a0808] dark:via-[#150a0a] dark:to-[#0d0606] px-4 sm:px-6 relative overflow-hidden py-20">
      {/* Enhanced Multiple Glow Effects */}
      <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-red-500/25 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-rose-500/20 rounded-full blur-[140px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500/15 rounded-full blur-[160px] animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 max-w-2xl w-full animate-fadeIn">
        {/* Main Card */}
        <div className="bg-white/95 dark:bg-[#1a1a1a]/90 backdrop-blur-2xl rounded-4xl p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(220,38,38,0.3)] border border-red-100/50 dark:border-red-900/30 text-center relative overflow-hidden">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-red-600 via-rose-500 to-pink-500"></div>

          {/* Cancel Icon with Pulse Animation */}
          <div className="relative inline-flex mb-6 sm:mb-8">
            {/* Pulse Rings */}
            <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse"></div>

            {/* Main Icon */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-red-600 via-red-500 to-rose-600 flex items-center justify-center shadow-[0_10px_30px_rgba(220,38,38,0.4)] animate-shake">
              <svg
                className="w-10 h-10 sm:w-14 sm:h-14 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-5 bg-linear-to-r from-red-700 via-red-600 to-rose-600 bg-clip-text text-transparent leading-tight">
            Fund Cancelled
          </h1>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto px-4">
            Your fund has been cancelled. No charges were made to your account.
            <span className="block mt-2 text-red-600 dark:text-red-400 font-semibold">
              You can try again anytime to support our cause.
            </span>
          </p>

          {/* Info Card */}
          <div className="bg-linear-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200/60 dark:border-red-800/40 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 space-y-3">
            <div className="flex items-start gap-3 text-left">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  What happened?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The fund process was interrupted and no transaction was
                  completed. Your card was not charged.
                </p>
              </div>
            </div>
          </div>

          {/* Reasons Section */}
          <div className="bg-white/70 dark:bg-[#2a2a2a]/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 mb-8 sm:mb-10 text-left border border-red-100 dark:border-red-900/30">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
              Common reasons for cancellation:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  You clicked the back button or closed the fund window
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Connection timeout or internet interruption</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Changed your mind about the donation amount</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Link
              to="/give-fund"
              className="flex-1 group px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg
              bg-linear-to-r from-red-700 via-red-600 to-red-500
              text-white
              shadow-[0_8px_20px_rgba(220,38,38,0.3)]
              hover:shadow-[0_12px_30px_rgba(220,38,38,0.4)]
              hover:scale-105
              active:scale-95
              transition-all duration-300
              inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span>Try Again</span>
            </Link>

            <Link
              to="/"
              className="flex-1 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg
              bg-white dark:bg-[#2a2a2a]
              text-red-600 dark:text-red-400
              border-2 border-red-300 dark:border-red-700/50
              hover:bg-red-50 dark:hover:bg-red-900/20
              hover:border-red-400 dark:hover:border-red-600
              hover:scale-105
              active:scale-95
              transition-all duration-300
              inline-flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Go Home</span>
            </Link>
          </div>

          {/* Help Section */}
          <div className="pt-6 border-t border-red-200 dark:border-red-800/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              💡 Need help with donation?
            </p>
            <Link
              to="/contact"
              className="text-red-600 dark:text-red-400 font-bold text-sm hover:text-red-700 dark:hover:text-red-300 inline-flex items-center gap-2 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="border-b-2 border-red-600 dark:border-red-400">
                Contact Support
              </span>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-red-200 dark:border-red-800/30">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">RedDrop</span>
              <span>·</span>
              <span>Blood Donation Platform</span>
              <span>·</span>
              <span>🔒 Secure funds</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes shake {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        .animate-shake {
          animation: shake 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FundCancel;
