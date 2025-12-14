import React, { useContext, useState } from 'react';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../context/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const GiveFund = () => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { user, loading } = useContext(AuthContext);

  const handleFund = async () => {
    if (!amount || amount <= 0) return;

    setIsProcessing(true);

    try {
      const fundInfo = {
        amount: amount,
        email: user.email,
        displayName: user.displayName,
      };

      const res = await axiosSecure.post('/create-checkout-session', fundInfo);

      // Stripe checkout page এ redirect
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      alert('fund failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <section className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 md:px-16 relative overflow-hidden bg-linear-to-br from-red-50 via-pink-50 to-white dark:from-[#1a0a0a] dark:via-[#150c0c] dark:to-[#0d0b0b]">
      {/* Enhanced Glow Effects */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-red-500/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/15 rounded-full blur-[100px] sm:blur-[140px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-red-600/5 rounded-full blur-[120px] sm:blur-[160px]"></div>

      {/* Hero / Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 animate-fadeIn">
        <div className="inline-block mb-3 sm:mb-4 px-4 sm:px-5 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full border border-red-200 dark:border-red-800/50">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide">
            ❤️ SAVE LIVES TODAY
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-5 px-4 bg-linear-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent drop-shadow-sm leading-tight">
          Support Blood Emergency Fund
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
          Your donation saves lives by funding emergency blood transport,
          storage, and medical supplies across Bangladesh.
        </p>
      </div>

      {/* Main Content - Enhanced Card */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
          <div className="bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-100 dark:border-red-900/30 hover:scale-105 transition-transform duration-300">
            <p className="text-xl sm:text-2xl font-bold text-red-600 mb-0.5">
              1,240+
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              Lives Saved
            </p>
          </div>
          <div className="bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-100 dark:border-red-900/30 hover:scale-105 transition-transform duration-300">
            <p className="text-xl sm:text-2xl font-bold text-red-600 mb-0.5">
              24/7
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              Coverage
            </p>
          </div>
          <div className="bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-100 dark:border-red-900/30 hover:scale-105 transition-transform duration-300">
            <p className="text-xl sm:text-2xl font-bold text-red-600 mb-0.5">
              100%
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              Transparent
            </p>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-[#1a1a1a]/80 backdrop-blur-2xl border border-red-100 dark:border-red-900/30 rounded-[20px] sm:rounded-[28px] p-3 sm:p-4 md:p-10 shadow-[0_8px_32px_rgba(255,0,0,0.12)] hover:shadow-[0_12px_48px_rgba(255,0,0,0.18)] transition-all duration-500 mx-2 sm:mx-0">
          {/* Description Block */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-red-500 to-pink-600 rounded-lg sm:rounded-xl mb-4 sm:mb-5 shadow-lg">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 px-2">
              Make an Impact Today
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto px-2">
              Every contribution ensures blood reaches patients in critical
              condition when they need it most - 24/7 nationwide coverage.
            </p>
          </div>

          {/* Input Field + Button */}
          <div className="space-y-5 sm:space-y-6">
            {/* Amount Input */}
            <div className="group">
              <label className="block mb-3 sm:mb-4 font-bold text-gray-900 dark:text-white text-base sm:text-lg text-center">
                Choose Your Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-lg sm:text-xl font-bold text-red-600">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-16 sm:pr-18 py-4 sm:py-5 text-2xl sm:text-3xl font-bold text-center bg-linear-to-br from-white via-red-50/30 to-white dark:from-[#2a2a2a] dark:via-[#2a2a2a] dark:to-[#2a2a2a] border-2 sm:border-3 border-red-300 dark:border-red-700/50 rounded-xl sm:rounded-2xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:border-red-400 text-gray-900 dark:text-white"
                />
                <span className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold bg-red-100 dark:bg-red-900/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                  USD
                </span>
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-1 sm:pt-2">
              {[25, 50, 100, 250].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 border-2 shadow-md hover:scale-105 active:scale-95 ${
                    amount === val.toString()
                      ? 'bg-linear-to-br from-red-700 via-red-600 to-red-500 text-white border border-red-600/40 shadow-[0_2px_10px_rgba(220,38,38,0.25)]scale-105'
                      : 'bg-white dark:bg-[#2a2a2a] border-red-200 dark:border-red-800/40 hover:border-red-400 hover:shadow-[0_4px_16px_rgba(255,0,0,0.15)] text-gray-800 dark:text-gray-200'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Fund Button */}
            <div className="flex justify-center pt-4 sm:pt-5">
              <button
                onClick={handleFund}
                disabled={!amount || isProcessing}
                className={`px-10 sm:px-14 py-3.5 sm:py-4 bg-linear-to-br from-red-800 via-red-600 to-red-500
               text-white text-base sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-[0_8px_24px_rgba(220,38,38,0.4)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out w-full sm:w-auto sm:min-w-[260px] flex items-center justify-center gap-2 sm:gap-2.5 ${
                 !amount || isProcessing
                   ? 'opacity-50 cursor-not-allowed shadow-none hover:scale-100'
                   : ''
               }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Secure Checkout</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 pt-4 sm:pt-5 flex-wrap px-2">
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold whitespace-nowrap">
                  SSL Encrypted
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold whitespace-nowrap">
                  Stripe Verified
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold whitespace-nowrap">
                  100% Secure
                </span>
              </div>
            </div>

            <p className="text-center text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 pt-1 sm:pt-2 font-medium px-2">
              🔒 Powered by Stripe · Tax deductible · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveFund;
