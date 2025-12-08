import React from 'react';
import { useNavigate } from 'react-router';

const BloodRequests = () => {
  const navigate = useNavigate();

  // Dummy Pending Request Data (শুধু pending status)
  const dummyRequests = [
    {
      id: 1,
      recipientName: 'Mariam Akter',
      location: 'Chattogram, Halishahar',
      bloodGroup: 'O-',
      date: '2025-12-12',
      time: '02:00 PM',
      status: 'pending', // ✅ এখানে status
    },
    {
      id: 2,
      recipientName: 'Rina Akter',
      location: 'Sylhet, Beanibazar',
      bloodGroup: 'B+',
      date: '2025-12-20',
      time: '11:00 AM',
      status: 'done', // ❌ এটা pending না
    },
    {
      id: 3,
      recipientName: 'Jamal Hossain',
      location: 'Khulna, Sonadanga',
      bloodGroup: 'A+',
      date: '2025-12-22',
      time: '03:00 PM',
      status: 'pending', // ✅ pending
    },
  ];

  const pendingRequests = dummyRequests.filter(req => req.status === 'pending');

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
                  {req.location}
                </td>
                <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                  <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold shadow">
                    {req.bloodGroup}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {req.date}
                </td>
                <td className="px-4 md:px-6 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {req.time}
                </td>
                <td className="px-4 md:px-6 py-3 text-center whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/blood-details/${req.id}`)}
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
      </div>
    </section>
  );
};

export default BloodRequests;
