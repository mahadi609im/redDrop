import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import LoadingSpin from '../../../Components/Loading/LoadingSpin';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const FundingPage = () => {
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { data: fundings = [], isLoading } = useQuery({
    queryKey: ['funds'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funds');
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#120909]">
      {/* Enhanced Glow Effects */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-red-500/20 rounded-full blur-[80px] sm:blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-red-700/10 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-red-600/5 rounded-full blur-[120px]"></div>

      {/* Beautiful Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-14 animate-fadeIn">
        {/* Badge */}
        <div className="inline-block mb-4 sm:mb-5 px-4 sm:px-5 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full border border-red-200 dark:border-red-800/50">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide">
            💰 COMMUNITY IMPACT
          </p>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 px-4 bg-linear-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent drop-shadow-sm leading-tight">
          Funding Contributors
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 mb-6 sm:mb-8">
          Honoring every generous contribution that helps save lives through
          emergency blood services across Bangladesh.
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8 flex-wrap px-4">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              {fundings.length}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Contributors
            </p>
          </div>
          <div className="w-px h-10 bg-red-200 dark:bg-red-800/30"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              24/7
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Coverage
            </p>
          </div>
          <div className="w-px h-10 bg-red-200 dark:bg-red-800/30"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              100%
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Transparent
            </p>
          </div>
        </div>

        {/* Give Fund Button */}
        <button
          onClick={() => navigate('/give-fund')}
          className="group px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-[0_8px_24px_rgba(220,38,38,0.4)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out inline-flex items-center gap-2.5 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>Give Fund Now</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>

      {/* Funding Table */}
      {loading || isLoading ? (
        <LoadingSpin />
      ) : (
        <div className="relative z-10 max-w-6xl mx-auto mt-10 bg-white/80 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-600/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
          {fundings.length === 0 && (
            <div className="py-10">
              <p className="text-center text-red-500 font-semibold text-lg">
                No Fundings yet.
              </p>
            </div>
          )}
          {fundings.length > 0 && (
            <table className="min-w-full table-auto text-sm md:text-base">
              <thead>
                <tr className="bg-red-600 text-white text-left">
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    User
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Email
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Transaction ID
                  </th>
                  <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {fundings.map(fund => (
                  <tr
                    key={fund._id}
                    className="border-b border-red-500/10 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all"
                  >
                    <td className="px-4 md:px-6 py-3 font-semibold text-red-700 dark:text-red-300 whitespace-nowrap">
                      {fund.name}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {fund.email}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      ${fund.amount}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {fund.transactionId}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {new Date(fund.fundAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
};

export default FundingPage;
