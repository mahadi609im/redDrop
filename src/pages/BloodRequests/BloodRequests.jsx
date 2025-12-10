import React, { use, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BloodRequests = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: requests = [] } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests`);
      console.log(res.data);
      return res.data;
    },
  });

  const pendingRequests = requests.filter(req => req.status === 'pending');

  const { loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <section
      className="min-h-screen py-20 px-6 md:px-20 relative 
      bg-linear-to-b from-red-50 to-white 
      dark:from-[#1a0c0c] dark:to-[#120909]"
    >
      {/* Soft floating circles */}
      <div className="absolute top-0 left-10 w-40 h-40 bg-red-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-56 h-56 bg-red-700/10 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-bold text-red-700 dark:text-red-400">
          Pending Blood Requests
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mt-3">
          Only showing requests that are currently pending.
        </p>
      </div>

      {/* Requests List - TABLE VIEW */}
      <div className="relative z-10 max-w-6xl mx-auto mt-10 bg-white/80 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-600/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
        {pendingRequests.length === 0 && (
          <div className="py-10">
            <p className="text-center text-red-500 font-semibold text-lg">
              No Request found.
            </p>
          </div>
        )}
        {pendingRequests.length > 0 && (
          <table className="min-w-full table-auto text-sm md:text-base">
            {/* Table Head */}
            <thead>
              <tr className="bg-red-600 text-white text-left">
                <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                  Recipient
                </th>
                <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                  Location
                </th>
                <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                  Blood
                </th>
                <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 md:px-6 py-3 font-semibold whitespace-nowrap">
                  Time
                </th>
                <th className="px-4 md:px-6 py-3 font-semibold text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {pendingRequests.map(req => (
                <tr
                  key={req.id}
                  className="border-b border-red-500/10 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all"
                >
                  <td className="px-4 md:px-6 py-3 font-semibold text-red-700 dark:text-red-300 whitespace-nowrap">
                    {req.recipientName}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {req.district}, {req.upazila}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                    <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold shadow">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {req.donationDate}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {req.donationTime}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/blood-details/${req._id}`)}
                      className="
                px-4 md:px-5 py-2 bg-red-600 text-white rounded-lg font-semibold
                shadow-[0_4px_16px_rgba(255,0,0,0.25)]
                hover:bg-red-700 hover:shadow-[0_6px_20px_rgba(255,0,0,0.35)]
                active:scale-95 transition-all
              "
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default BloodRequests;
