import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaEdit, FaTrash, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';

const MyDonationDetails = () => {
  const navigate = useNavigate();

  const requestData = {
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
  };

  const [status, setStatus] = useState(requestData.status);

  const statusColor = {
    pending:
      'inline-block px-3 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 shadow-sm ring-1 ring-yellow-200',
    inprogress:
      'inline-block px-3 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 shadow-sm ring-1 ring-blue-200',
    done: 'inline-block px-3 rounded-full text-sm font-semibold bg-green-100 text-green-800 shadow-sm ring-1 ring-green-200',
    canceled:
      'inline-block px-3 rounded-full text-sm font-semibold bg-red-100 text-red-800 shadow-sm ring-1 ring-red-200',
  };

  const handleMarkDone = () => setStatus('done');
  const handleCancel = () => setStatus('canceled');
  const handleDelete = () =>
    window.confirm('Are you sure you want to delete?') &&
    console.log('Deleted');

  return (
    <section className="min-h-screen py-16 px-6 md:px-20 bg-red-50 dark:bg-[#120909] relative rounded-2xl">
      <div className="max-w-5xl mx-auto bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-red-500/20">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 dark:text-red-400 mb-8">
          Donation Request Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* Left Column */}
          <div className="space-y-4 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#1a1a1a]/70 p-6 rounded-2xl shadow-sm">
            {status === 'inprogress' && requestData.donor && (
              <>
                <p>
                  <span className="font-semibold text-red-600">
                    Donor Name:
                  </span>{' '}
                  {requestData.donor.name}
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Donor Email:
                  </span>{' '}
                  {requestData.donor.email}
                </p>
              </>
            )}
            <p>
              <span className="font-semibold text-red-600">Recipient:</span>{' '}
              {requestData.recipientName}
            </p>
            <p>
              <span className="font-semibold text-red-600">District:</span>{' '}
              {requestData.district}
            </p>
            <p>
              <span className="font-semibold text-red-600">Upazila:</span>{' '}
              {requestData.upazila}
            </p>
            <p>
              <span className="font-semibold text-red-600">Hospital:</span>{' '}
              {requestData.hospital}
            </p>
            <p>
              <span className="font-semibold text-red-600">Address:</span>{' '}
              {requestData.address}
            </p>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:flex justify-center">
            <div className="w-px bg-red-500/40 mx-4 h-full"></div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#1a1a1a]/70 p-6 rounded-2xl shadow-sm">
            <p>
              <span className="font-semibold text-red-600">Blood Group:</span>{' '}
              <span className="inline-block px-4 py-1 rounded-full font-bold bg-red-600 text-white shadow">
                {requestData.bloodGroup}
              </span>
            </p>
            <p>
              <span className="font-semibold text-red-600">Donation Date:</span>{' '}
              {requestData.date}
            </p>
            <p>
              <span className="font-semibold text-red-600">Donation Time:</span>{' '}
              {requestData.time}
            </p>
            <p>
              <span className="font-semibold text-red-600">Message:</span>{' '}
              {requestData.message}
            </p>
            <p className="space-x-2">
              <span className="font-semibold text-red-600">Status:</span>{' '}
              <span className={`${statusColor[status]}`}>
                {status.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons with Icons */}
        <div className="mt-8 flex flex-wrap gap-3 justify-start">
          {/* Status Actions */}
          {status === 'inprogress' && (
            <>
              <button
                onClick={handleMarkDone}
                className="p-3 rounded-full border border-green-700 bg-green-700/30 text-green-700 shadow hover:bg-green-700/50 transition"
                title="Mark Done"
              >
                <FaCheck />
              </button>
              <button
                onClick={handleCancel}
                className="p-3 rounded-full border border-red-700 bg-red-700/30 text-red-700 shadow hover:bg-red-700/50 transition"
                title="Mark Canceled"
              >
                <FaTimes />
              </button>
            </>
          )}

          {/* Edit */}
          {status !== 'done' && status !== 'canceled' && (
            <button
              onClick={() =>
                navigate(`/dashboard/create-donation-request/${requestData.id}`)
              }
              className="p-3 rounded-full border border-yellow-600 bg-yellow-600/30 text-yellow-600 shadow hover:bg-yellow-600/50 transition"
              title="Edit Request"
            >
              <FaEdit />
            </button>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="p-3 rounded-full border border-red-600 bg-red-600/30 text-red-500 shadow hover:bg-red-600/50 transition"
            title="Delete Request"
          >
            <FaTrash />
          </button>

          {/* Back */}
          <button
            onClick={() => navigate('/dashboard/my-donation-requests')}
            className="p-3 rounded-full border border-gray-400 bg-gray-400/30 text-gray-300 shadow hover:bg-gray-400/50 transition"
            title="Back"
          >
            <FaArrowLeft />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyDonationDetails;
