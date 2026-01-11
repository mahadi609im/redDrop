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
      return res.data;
    },
  });

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden bg-base-100 transition-colors duration-300">
      {/* Dynamic Background Glows based on Theme */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-primary/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-10 sm:mb-14 animate-fadeIn">
        {/* Badge */}
        <div className="inline-block mb-4 sm:mb-5 px-4 sm:px-5 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <p className="text-xs font-bold text-primary tracking-wide uppercase">
            💰 Community Impact
          </p>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5 px-4 text-base-content tracking-tighter">
          Funding <span className="text-primary">Contributors</span>
        </h1>

        {/* Description */}
        <p className="text-base-content opacity-70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 mb-6 sm:mb-8">
          Honoring every generous contribution that helps save lives through
          emergency blood services across Bangladesh.
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8 flex-wrap px-4">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-primary">
              {fundings.length}
            </p>
            <p className="text-xs sm:text-sm font-bold opacity-50 uppercase">
              Contributors
            </p>
          </div>
          <div className="w-px h-10 bg-base-300"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-primary">24/7</p>
            <p className="text-xs sm:text-sm font-bold opacity-50 uppercase">
              Coverage
            </p>
          </div>
          <div className="w-px h-10 bg-base-300"></div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-primary">100%</p>
            <p className="text-xs sm:text-sm font-bold opacity-50 uppercase">
              Transparent
            </p>
          </div>
        </div>

        {/* Give Fund Button */}
        <button
          onClick={() => navigate('/give-fund')}
          className="group px-8 sm:px-10 py-3 sm:py-3.5 bg-primary text-primary-content text-base sm:text-lg font-black rounded-xl shadow-xl shadow-primary/20 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 ease-out inline-flex items-center gap-2.5 cursor-pointer uppercase tracking-widest"
        >
          <DropletIcon />
          <span>Give Fund Now</span>
          <ArrowRightIcon />
        </button>
      </div>

      {/* Funding Table Container */}
      {loading || isLoading ? (
        <LoadingSpin />
      ) : (
        <div className="relative z-10 mx-auto mt-10 bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2rem] shadow-2xl overflow-hidden">
          {fundings.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-primary font-black text-xl uppercase tracking-widest opacity-50">
                No Fundings yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-hide">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-primary text-primary-content text-left">
                    <th className="px-6 py-5 font-black uppercase text-xs tracking-[0.2em]">
                      Contributor
                    </th>
                    <th className="px-6 py-5 font-black uppercase text-xs tracking-[0.2em]">
                      Email Address
                    </th>
                    <th className="px-6 py-5 font-black uppercase text-xs tracking-[0.2em]">
                      Amount
                    </th>
                    <th className="px-6 py-5 font-black uppercase text-xs tracking-[0.2em]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  {fundings.map((fund, idx) => (
                    <tr
                      key={fund._id}
                      className="hover:bg-primary/5 transition-colors group"
                    >
                      <td className="px-6 py-5 font-bold text-base-content whitespace-nowrap">
                        {fund.name}
                      </td>
                      <td className="px-6 py-5 opacity-70 text-base-content whitespace-nowrap">
                        {fund.email}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-black">
                          ${fund.amount}
                        </span>
                      </td>
                      <td className="px-6 py-5 opacity-50 text-base-content whitespace-nowrap text-sm font-medium">
                        {new Date(fund.fundAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// Helper Icon Components for cleaner code
const DropletIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

export default FundingPage;
