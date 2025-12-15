import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import { jsPDF } from 'jspdf';

const FundSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .post('/funds', { sessionId })
      .then(res => {
        if (res.data.success) {
          setFund(res.data.fundInfo || res.data);
        }
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  }, [sessionId, axiosSecure]);

  const handleDownloadReceipt = () => {
    if (!fund) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('RedDrop Blood Donation Fund Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${fund.name}`, 20, 40);
    doc.text(`Email: ${fund.email}`, 20, 50);
    doc.text(`Amount: $${fund.amount}`, 20, 60);
    doc.text(`Transaction ID: ${fund.transactionId}`, 20, 70);
    doc.text(
      `Date: ${new Date(fund.fundAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      20,
      80
    );

    doc.save(`RedDrop_Receipt_${fund.transactionId}.pdf`);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-pink-50 to-orange-50 dark:from-[#1a0808] dark:via-[#150a0a] dark:to-[#0d0606] px-4 sm:px-6 relative overflow-hidden py-20">
      <div className="relative z-10 max-w-xl w-full animate-fadeIn">
        {/* Main Card */}
        <div className="bg-white/95 dark:bg-[#1a1a1a]/90 backdrop-blur-2xl rounded-4xl p-6 sm:p-10 md:p-12  text-center relative overflow-hidden">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-green-600 via-emerald-500 to-teal-500"></div>

          {/* Success Icon with Pulse Animation */}
          <div className="relative inline-flex mb-6 sm:mb-8">
            {/* Pulse Rings */}
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-green-500/30 animate-pulse"></div>

            {/* Main Icon */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-linear-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.4)] animate-bounce-slow">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-xl md:text-3xl font-extrabold mb-4 sm:mb-5 bg-linear-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
            fund Successful!
          </h1>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto px-4">
            Thank you for your generous contribution of{' '}
            <span className="font-bold text-green-600 dark:text-green-400">
              ${fund?.amount}
            </span>
            . Your support will directly help save lives through emergency blood
            services across Bangladesh.
          </p>

          {/* Transaction Details Card */}
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/60 dark:border-green-800/40 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 space-y-3">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Transaction ID:
              </span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">
                {fund?.transactionId}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                fund Method:
              </span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 8H4V6h16m0 12H4v-6h16m0-8H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Stripe
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Date & Time:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {fund?.fundAt
                  ? new Date(fund.fundAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Link
              to="/"
              className="flex-1 group px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg
              bg-linear-to-r from-green-700 via-green-600 to-emerald-600
              text-white
              shadow-[0_8px_20px_rgba(34,197,94,0.3)]
              hover:shadow-[0_12px_30px_rgba(34,197,94,0.4)]
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

            <Link
              to="/funds"
              className="flex-1 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg
              bg-white dark:bg-[#2a2a2a]
              text-green-600 dark:text-green-400
              border-2 border-green-300 dark:border-green-700/50
              hover:bg-green-50 dark:hover:bg-green-900/20
              hover:border-green-400 dark:hover:border-green-600
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>Funds</span>
            </Link>
          </div>

          {/* Download Receipt */}
          <div className="pt-6 border-t border-green-200 dark:border-green-800/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              📧 Confirmation email sent to your inbox
            </p>
            <button
              onClick={handleDownloadReceipt}
              className="text-green-600 dark:text-green-400 font-bold text-sm hover:text-green-700 dark:hover:text-green-300 inline-flex items-center gap-2 group"
            >
              <svg
                className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="border-b-2 border-green-600 dark:border-green-400">
                Download Receipt
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-green-200 dark:border-green-800/30">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4 text-green-600"
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
    </section>
  );
};

export default FundSuccess;
