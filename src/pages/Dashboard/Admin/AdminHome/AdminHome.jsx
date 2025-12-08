import React from 'react';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { FaHandHoldingDroplet } from 'react-icons/fa6';

const AdminHome = () => {
  // Example stats, later fetch from API
  const stats = {
    totalUsers: 1250,
    totalFunds: 8420,
    totalRequests: 320,
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#0d0b0b] p-6 md:p-10  overflow-hidden flex flex-col justify-center rounded-2xl">
      {/* Welcome Section */}
      <div className=" text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 ">
          Welcome, Admin! 👋
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-xl mx-auto">
          Here's an overview of your platform's current statistics and activity.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid z-10 grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Total Users */}
        <div className="bg-white/80 dark:bg-gray-900/70  border border-red-200/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-red-600 text-4xl" />
            <div>
              <h3 className="text-gray-500 dark:text-gray-400">Total Users</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers}
              </p>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Total Funds */}
        <div className="bg-white/80 dark:bg-gray-900/70  border border-green-200/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <FaMoneyBillWave className="text-green-600 text-4xl" />
            <div>
              <h3 className="text-gray-500 dark:text-gray-400">Total Funds</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                ${stats.totalFunds}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="bg-white/80 dark:bg-gray-900/70  border border-red-200/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <FaHandHoldingDroplet className="text-red-600 text-4xl" />
            <div>
              <h3 className="text-gray-500 dark:text-gray-400">
                Total Requests
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalRequests}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-red-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-red-400/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
