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
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      alert('Fund failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 md:px-16 relative overflow-hidden bg-base-100 transition-colors duration-300">
      {/* Background Glows matching the theme */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-[140px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 animate-fadeIn">
        <div className="inline-block mb-3 sm:mb-4 px-4 sm:px-5 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <p className="text-xs font-black text-primary tracking-widest uppercase">
            ❤️ Save Lives Today
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-5 px-4 text-base-content tracking-tighter">
          Support <span className="text-primary">Emergency Fund</span>
        </h1>
        <p className="text-base-content opacity-70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
          Your donation saves lives by funding emergency blood transport,
          storage, and medical supplies across Bangladesh.
        </p>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Lives Saved', value: '1,240+' },
            { label: 'Coverage', value: '24/7' },
            { label: 'Transparent', value: '100%' },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-base-200 border border-base-300 rounded-2xl p-4 text-center hover:scale-105 transition-transform"
            >
              <p className="text-xl sm:text-2xl font-black text-primary">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs font-bold uppercase opacity-50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-base-100 dark:bg-base-200 border border-base-300 rounded-[2.5rem] p-6 md:p-12 shadow-2xl transition-all">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary text-primary-content rounded-2xl mb-5 shadow-lg shadow-primary/30">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-base-content mb-3">
              Make an Impact
            </h2>
            <p className="opacity-60 text-sm sm:text-base px-2">
              Every contribution ensures blood reaches patients in critical
              condition when they need it most.
            </p>
          </div>

          <div className="space-y-8">
            {/* Amount Input */}
            <div className="group text-center">
              <label className="block mb-4 font-black uppercase text-xs tracking-[0.2em] opacity-50">
                Choose Donation Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-primary">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-12 pr-12 py-6 text-4xl font-black text-center bg-base-200 border-2 border-transparent focus:border-primary focus:bg-base-100 rounded-3xl transition-all text-base-content outline-none"
                />
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-4 gap-3">
              {[25, 50, 100, 250].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className={`py-4 rounded-2xl font-black text-sm transition-all border-2 active:scale-95 ${
                    amount === val.toString()
                      ? 'bg-primary text-primary-content border-primary shadow-lg shadow-primary/20'
                      : 'bg-base-200 border-transparent hover:border-primary/50 text-base-content'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            {/* Fund Button */}
            <button
              onClick={handleFund}
              disabled={!amount || isProcessing}
              className={`w-full py-5 bg-primary text-primary-content font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 ${
                (!amount || isProcessing) &&
                'opacity-50 cursor-not-allowed grayscale'
              }`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              )}
              <span>{isProcessing ? 'Processing...' : 'Secure Checkout'}</span>
            </button>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-base-300">
              <div className="flex flex-wrap justify-center gap-6 opacity-50">
                <Badge icon="🛡️" text="SSL Encrypted" />
                <Badge icon="💳" text="Stripe Verified" />
                <Badge icon="✨" text="Tax Deductible" />
              </div>
              <p className="text-center text-[10px] font-bold uppercase tracking-widest opacity-30 mt-6">
                🔒 Protected by industry standard encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-base-content">
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export default GiveFund;
