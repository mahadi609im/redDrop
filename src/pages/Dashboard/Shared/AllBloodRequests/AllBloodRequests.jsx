import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSpinner, FaTrash } from 'react-icons/fa';

const dummyRequests = [
  {
    id: 1,
    recipientName: 'Rahim Uddin',
    district: 'Dhaka',
    upazila: 'Uttara',
    bloodGroup: 'A+',
    date: '2025-12-10',
    time: '10:00 AM',
    status: 'inprogress',
    donor: { name: 'Maha', email: 'maha@example.com' },
  },
  {
    id: 2,
    recipientName: 'Mariam Akter',
    district: 'Chattogram',
    upazila: 'Halishahar',
    bloodGroup: 'O-',
    date: '2025-12-12',
    time: '02:00 PM',
    status: 'pending',
    donor: { name: 'Maha', email: 'maha@example.com' },
  },
  {
    id: 3,
    recipientName: 'Sakib Hasan',
    district: 'Rajshahi',
    upazila: 'Godagari',
    bloodGroup: 'AB+',
    date: '2025-12-15',
    time: '09:00 AM',
    status: 'done',
    donor: { name: 'Maha', email: 'maha@example.com' },
  },
  {
    id: 4,
    recipientName: 'Rina Akter',
    district: 'Sylhet',
    upazila: 'Beanibazar',
    bloodGroup: 'B+',
    date: '2025-12-20',
    time: '11:00 AM',
    status: 'canceled',
    donor: { name: 'Maha', email: 'maha@example.com' },
  },
  {
    id: 5,
    recipientName: 'Kamal Hossain',
    district: 'Khulna',
    upazila: 'Sonadanga',
    bloodGroup: 'O+',
    date: '2025-12-25',
    time: '03:00 PM',
    status: 'inprogress',
    donor: { name: 'Maha', email: 'maha@example.com' },
  },
];

const AllBloodDonationRequests = () => {
  const [requests, setRequests] = useState(dummyRequests);
  const [filter, setFilter] = useState('all');
  const role = localStorage.getItem('userRole'); // admin / volunteer

  const filteredRequests =
    filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const changeStatus = (id, status) => {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
  };

  const deleteRequest = id => {
    if (role === 'admin') {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#0d0b0b] py-20 px-4 md:px-10 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 dark:text-red-400">
          All Blood Donation Requests 🩸
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto">
          {role === 'admin'
            ? "Admin can manage all users' blood donation requests."
            : 'Volunteers can view all requests and update status only.'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filter === f
                ? 'bg-red-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto bg-white/90 dark:bg-[#1a1a1a]/80 border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-400/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
        <table className="w-full table-fixed border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="py-4 text-center">Recipient</th>
              <th className="py-4 text-center">Location</th>
              <th className="py-4 text-center">Blood</th>
              <th className="py-4 text-center">Date & Time</th>
              <th className="py-4 text-center">Status</th>
              <th className="py-4 text-center">Donor Info</th>
              {(role === 'admin' || role === 'volunteer') && (
                <th className="py-4 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="text-white">
            {filteredRequests.map(req => (
              <tr
                key={req.id}
                className="hover:bg-red-50/60 dark:hover:bg-red-900/10 border-b border-red-500/10 text-center"
              >
                <td className="py-4 font-semibold text-red-700 dark:text-red-300">
                  {req.recipientName}
                </td>
                <td className="py-4">
                  {req.district}, {req.upazila}
                </td>
                <td>
                  <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow">
                    {req.bloodGroup}
                  </span>
                </td>
                <td className="py-4">
                  {req.date} | {req.time}
                </td>

                {/* Status */}
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      req.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : req.status === 'inprogress'
                        ? 'bg-blue-100 text-blue-800'
                        : req.status === 'done'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-300 text-red-900 dark:bg-red-500 dark:text-red-100'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                {/* Donor Info */}
                <td className="py-4 text-gray-700 dark:text-gray-300">
                  {req.donor.name} ({req.donor.email})
                </td>

                {/* Actions */}
                {(role === 'admin' || role === 'volunteer') && (
                  <td className="py-4 flex justify-center gap-2 flex-wrap">
                    {/* Pending → In Progress */}
                    {req.status === 'pending' && (
                      <button
                        onClick={() => changeStatus(req.id, 'inprogress')}
                        className="p-2 rounded-full border border-blue-500 bg-blue-600/20 text-white shadow hover:bg-blue-500/50 transition"
                        title="Start Progress"
                      >
                        <FaSpinner />
                      </button>
                    )}

                    {/* In Progress → Done */}
                    {req.status === 'inprogress' && (
                      <button
                        onClick={() => changeStatus(req.id, 'done')}
                        className="p-2 rounded-full border border-green-500 bg-green-500/20 text-white shadow hover:bg-green-500/50 transition"
                        title="Mark Done"
                      >
                        <FaCheck />
                      </button>
                    )}

                    {/* Already Done */}
                    {req.status === 'done' && (
                      <span className="text-green-500 text-lg font-bold flex items-center">
                        <FaCheck />
                      </span>
                    )}

                    {/* Already Canceled */}
                    {req.status === 'canceled' && (
                      <span className="text-red-500 text-lg font-bold flex items-center">
                        <FaTimes />
                      </span>
                    )}

                    {/* Cancel & Delete only for Admin */}
                    {role === 'admin' &&
                      req.status !== 'done' &&
                      req.status !== 'canceled' && (
                        <button
                          onClick={() => changeStatus(req.id, 'canceled')}
                          className="p-2 rounded-full border border-red-500 bg-red-500/20 text-white shadow hover:bg-red-500/50 transition"
                          title="Cancel Request"
                        >
                          <FaTimes />
                        </button>
                      )}
                    {role === 'admin' && (
                      <button
                        onClick={() => deleteRequest(req.id)}
                        className="p-2 rounded-full border border-red-600 bg-red-600/20 text-white shadow hover:bg-red-600/50 transition"
                        title="Delete Request"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No requests found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBloodDonationRequests;
