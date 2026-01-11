import React from 'react';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { FaHandHoldingDroplet } from 'react-icons/fa6';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';
import CountUp from '../../../../Components/CountUp/CountUp';
import DonationChart from '../../../../Components/DonationChart/DonationChart';

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Donation Requests
  const { data: totalRequests = [], isLoading: totalRequestLoad } = useQuery({
    queryKey: ['donationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests`);
      return res.data;
    },
  });

  // Fetch Total Funds
  const { data: totalFunds = 0, isLoading: totalAmountLoad } = useQuery({
    queryKey: ['totalFunds'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funds/total');
      return res.data.totalAmount;
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
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Admin Welcome Header */}
      <div className="relative z-10 text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">
            Administrative Control
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter italic uppercase leading-none">
          Command{' '}
          <span className="text-primary not-italic tracking-normal">
            Center
          </span>{' '}
          👋
        </h1>
        <p className="text-base-content/60 mt-4 max-w-xl mx-auto font-medium italic">
          Master overview of the system's infrastructure, user engagement, and
          financial growth.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto">
        {/* Total Users Card */}
        <div className="group relative overflow-hidden bg-base-200/50 backdrop-blur-md border border-base-300 rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <FaUsers size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 italic">
                System Users
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-base-content italic mt-1">
                <CountUp value={allUsers.length} />
              </h3>
              <p className="text-sm font-bold text-base-content/60">
                Total Population
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
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
                Treasury Status
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-base-content italic mt-1">
                $<CountUp value={totalFunds} />
              </h3>
              <p className="text-sm font-bold text-base-content/60">
                Total Revenue
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
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
                Request Pipeline
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-base-content italic mt-1">
                <CountUp value={totalRequests.length} />
              </h3>
              <p className="text-sm font-bold text-base-content/60">
                Total Donations
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
            <FaHandHoldingDroplet size={120} />
          </div>
        </div>
      </div>

      {/* Visual Analytics Section */}
      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        <div className="bg-base-200/30 backdrop-blur-xl border border-base-300 rounded-[3.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration inside chart container */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 rounded-full" />

          <div className="relative z-10">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-black italic uppercase tracking-wider text-base-content">
                  Strategic Analytics
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">
                  Global activity & engagement trends
                </p>
              </div>
              <div className="h-[1px] flex-grow bg-base-300 mx-8 hidden md:block opacity-30"></div>
            </div>
            <DonationChart donationRequests={totalRequests} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
