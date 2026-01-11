import React from 'react';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { FaHandHoldingDroplet } from 'react-icons/fa6';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';
import CountUp from '../../../../Components/CountUp/CountUp';
import DonationChart from '../../../../Components/DonationChart/DonationChart';

const VolunteerHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Total Funds
  const { data: totalFunds = 0, isLoading: totalAmountLoad } = useQuery({
    queryKey: ['totalFunds'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funds/total');
      return res.data.totalAmount;
    },
  });

  // Fetch Donation Requests
  const { data: totalRequests = [], isLoading: totalRequestLoad } = useQuery({
    queryKey: ['donationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests`);
      return res.data;
    },
  });

  // Fetch All Users
  const { data: allUsers = [], isLoading: allUsersLoad } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  if (allUsersLoad || totalAmountLoad || totalRequestLoad) {
    return <LoadingSpin />;
  }

  return (
    <section className="min-h-screen bg-base-100 transition-colors duration-500 py-16 px-4 md:px-10 overflow-hidden relative">
      {/* Background Decor - থিমের প্রাইমারি কালার অনুযায়ী গ্লো করবে */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Welcome Section */}
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter italic uppercase leading-none">
          Volunteer{' '}
          <span className="text-primary not-italic tracking-normal">
            Central
          </span>{' '}
          👋
        </h1>
        <p className="text-base-content/60 mt-4 max-w-xl mx-auto font-medium italic">
          Real-time oversight of the platform's vital statistics and blood
          donation pipeline.
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto">
        {/* Total Users Card */}
        <div className="group relative overflow-hidden bg-base-200/50 backdrop-blur-md border border-base-300 rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <FaUsers size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 italic">
                Global Network
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-base-content italic mt-1">
                <CountUp value={allUsers.length} />
              </h3>
              <p className="text-sm font-bold text-base-content/60">
                Total Users
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <FaUsers size={120} />
          </div>
        </div>

        {/* Total Funds Card */}
        <div className="group relative overflow-hidden bg-base-200/50 backdrop-blur-md border border-base-300 rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <FaMoneyBillWave size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 italic">
                Financial Strength
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-base-content italic mt-1">
                $<CountUp value={totalFunds} />
              </h3>
              <p className="text-sm font-bold text-base-content/60">
                Total Funds
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <FaMoneyBillWave size={120} />
          </div>
        </div>

        {/* Total Requests Card */}
        <div className="group relative overflow-hidden bg-base-200/50 backdrop-blur-md border border-base-300 rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <FaHandHoldingDroplet size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 italic">
                Life Saving
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-base-content italic mt-1">
                <CountUp value={totalRequests.length} />
              </h3>
              <p className="text-sm font-bold text-base-content/60">
                Total Requests
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <FaHandHoldingDroplet size={120} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        <div className="bg-base-200/30 backdrop-blur-xl border border-base-300 rounded-[3rem] p-6 md:p-10 shadow-xl">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-wider text-base-content">
                Donation Analytics
              </h2>
              <p className="text-sm text-base-content/50 font-medium">
                Visualization of monthly blood request trends
              </p>
            </div>
            <div className="h-[2px] flex-grow bg-base-300 mx-4 hidden md:block"></div>
          </div>
          <DonationChart donationRequests={totalRequests} />
        </div>
      </div>
    </section>
  );
};

export default VolunteerHome;
