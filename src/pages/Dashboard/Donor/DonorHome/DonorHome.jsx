import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FaCheck, FaTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const user = {
  name: 'Maha',
  email: 'maha@example.com',
  role: 'donor',
};

const dummyRequests = [
  {
    id: 'req001',
    recipientName: 'Rahim Uddin',
    district: 'Dhaka',
    upazila: 'Uttara',
    hospital: 'Dhaka Medical College Hospital',
    address: 'Zahir Raihan Rd, Dhaka',
    date: '2025-12-10',
    time: '10:00 AM',
    bloodGroup: 'A+',
    status: 'inprogress',
    donor: { name: 'Maha Hasan', email: 'maha@example.com' },
    message: 'Urgent need of blood for surgery',
  },
  {
    id: 'req002',
    recipientName: 'Karim Ahmed',
    district: 'Chattogram',
    upazila: 'Pahartali',
    hospital: 'Chattogram Medical College Hospital',
    address: 'O.R. Nizam Rd, Chattogram',
    date: '2025-12-12',
    time: '02:00 PM',
    bloodGroup: 'B-',
    status: 'pending',
    donor: { name: 'Maha Hasan', email: 'maha@example.com' },
    message: 'Need blood for accident patient',
  },
  {
    id: 'req003',
    recipientName: 'Sonia Rahman',
    district: 'Khulna',
    upazila: 'Sonadanga',
    hospital: 'Khulna Medical College Hospital',
    address: 'Jashore Rd, Khulna',
    date: '2025-12-15',
    time: '11:00 AM',
    bloodGroup: 'O+',
    status: 'done',
    donor: { name: 'Maha Hasan', email: 'maha@example.com' },
    message: 'Scheduled blood donation',
  },
];

const statusColor = {
  pending:
    'px-2 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 capitalize',
  inprogress:
    'px-2 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 capitalize',
  done: 'px-2 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 capitalize',
  canceled:
    'px-2 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 capitalize',
};

const DonorHome = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(dummyRequests);

  const handleDelete = id => {
    const requestToDelete = requests.find(r => r.id === id);
    if (!requestToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the donation request for ${requestToDelete.recipientName}?`
    );

    if (confirmDelete) {
      // Remove the request from state
      const updatedRequests = requests.filter(r => r.id !== id);
      setRequests(updatedRequests);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Limit to maximum 3 recent requests
  const recentRequests = requests.slice(0, 3);

  return (
    <section className="min-h-screen bg-red-50 py-20 px-0 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto mt-3">
          Here are your recent donation requests.
        </p>
        {recentRequests.length < 1 && (
          <div className="mt-6  px-4 py-3">
            <Link
              to="/dashboard/create-donation-request"
              className="px-6 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              Create Donation
            </Link>
          </div>
        )}
      </div>

      {/* Recent Donation Requests Table */}
      {recentRequests.length > 0 && (
        <div className="w-full mx-auto mt-10 overflow-x-auto bg-white border border-red-500/20 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)]">
          <table className="min-w-full md:min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-red-600 text-white text-left">
                <th className="px-4 py-3 font-semibold">Recipient</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Blood</th>
                <th className="px-4 py-3 font-semibold">Date & Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Donor Info</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map(req => (
                <tr
                  key={req.id}
                  className="border-b border-red-500/10 hover:bg-red-50 transition-all"
                >
                  <td className="px-4 py-3 font-semibold text-red-700 whitespace-nowrap">
                    {req.recipientName}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {req.district}, {req.upazila}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {req.date} | {req.time}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={statusColor[req.status]}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {req.status === 'inprogress' && req.donor
                      ? `${req.donor.name} (${req.donor.email})`
                      : '-'}
                  </td>
                  <td className="px-4 py-3 flex flex-nowrap gap-1 justify-center items-center">
                    {/* Status buttons only for inprogress */}
                    {req.status === 'inprogress' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req.id, 'done')}
                          className="p-2 rounded-full border border-green-700 bg-green-700/30 text-green-700 shadow hover:bg-green-700/50 transition"
                          title="Mark Done"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleStatusChange(req.id, 'canceled')}
                          className="p-2 rounded-full border border-red-700 bg-red-700/30 text-red-700 shadow hover:bg-red-700/50 transition"
                          title="Mark Canceled"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}

                    {/* Edit button only for pending or inprogress */}
                    {(req.status === 'pending' ||
                      req.status === 'inprogress') && (
                      <Link
                        to={`/dashboard/edit-donation/${req.id}`}
                        className="p-2 rounded-full border border-yellow-600 bg-yellow-600/30 text-yellow-600 shadow hover:bg-yellow-600/50 transition"
                        title="Edit Request"
                      >
                        <FaEdit />
                      </Link>
                    )}

                    {/* Delete button for all statuses */}
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="p-2 rounded-full border border-red-600 bg-red-600/30 text-red-500 shadow hover:bg-red-600/50 transition"
                      title="Delete Request"
                    >
                      <FaTrash />
                    </button>

                    {/* View button  */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/donation-details/${req.id}`)
                      }
                      className="p-2 rounded-full border border-blue-600 bg-blue-600/30 text-blue-700 shadow hover:bg-blue-600/50 transition"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {recentRequests.length > 0 && (
        <div className="mt-6 text-right px-4 py-3">
          <Link
            to="/dashboard/my-donation-requests"
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
          >
            View My All Requests
          </Link>
        </div>
      )}
    </section>
  );
};

export default DonorHome;
