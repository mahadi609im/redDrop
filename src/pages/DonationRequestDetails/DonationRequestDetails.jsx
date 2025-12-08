import React, { useState } from 'react';

const DonationRequestDetails = () => {
  const requestData = {
    id: 'req001',
    requesterName: 'Maha Hasan',
    requesterEmail: 'maha@example.com',
    recipientName: 'Rahim Uddin',
    district: 'Dhaka',
    upazila: 'Savar',
    hospital: 'Dhaka Medical College Hospital',
    address: 'Zahir Raihan Rd, Dhaka',
    blood: 'A+',
    donationDate: '2025-12-15',
    donationTime: '14:30',
    message: 'Urgent need of blood for surgery',
    status: 'pending',
  };

  const [status, setStatus] = useState(requestData.status);
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDonation = () => {
    setStatus('inprogress');
    setShowModal(false);
  };

  return (
    <section className="min-h-screen py-20 px-6 md:px-16 relative bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#120909] overflow-hidden">
      {/* Glowing Circles */}
      <div className="absolute top-16 left-16 w-56 h-56 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-72 h-72 bg-red-700/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-2xl animate-pulse"></div>

      {/* Main Card */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Details */}
        <div className="bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl rounded-3xl p-10 shadow-[0_12px_30px_rgba(255,0,0,0.2)] border border-red-500/20 hover:shadow-[0_15px_40px_rgba(255,0,0,0.3)] transition-all duration-500 col-span-2">
          <h2 className="text-3xl font-extrabold text-red-700 dark:text-red-400 mb-6">
            Donation Request Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
            {/* Left Column */}
            <div className="space-y-4 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#1a1a1a]/70 p-6 rounded-2xl">
              <p>
                <span className="font-semibold text-red-100">Recipient:</span>{' '}
                {requestData.recipientName}
              </p>
              <p>
                <span className="font-semibold text-red-100">District:</span>{' '}
                {requestData.district}
              </p>
              <p>
                <span className="font-semibold text-red-100">Upazila:</span>{' '}
                {requestData.upazila}
              </p>
              <p>
                <span className="font-semibold text-red-100">Hospital:</span>{' '}
                {requestData.hospital}
              </p>
              <p>
                <span className="font-semibold text-red-100">Address:</span>{' '}
                {requestData.address}
              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:flex justify-center">
              <div className="w-px bg-red-500/50 mx-4 h-full"></div>{' '}
              {/* h-full added */}
            </div>

            {/* Right Column */}
            <div className="space-y-4 text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-[#1a1a1a]/70 p-6 rounded-2xl">
              <p>
                <span className="font-semibold text-red-100">Blood Group:</span>{' '}
                <span className="inline-block px-4 py-1 rounded-full font-bold bg-red-600 text-white shadow-[0_4px_15px_rgba(255,0,0,0.3)]">
                  {requestData.blood}
                </span>
              </p>
              <p>
                <span className="font-semibold text-red-100">
                  Donation Date:
                </span>{' '}
                {requestData.donationDate}
              </p>
              <p>
                <span className="font-semibold text-red-100">
                  Donation Time:
                </span>{' '}
                {requestData.donationTime}
              </p>
              <p>
                <span className="font-semibold text-red-100">Message:</span>{' '}
                {requestData.message}
              </p>
              <p>
                <span className="font-semibold text-red-100">Status:</span>{' '}
                <span
                  className={`${
                    status === 'pending' ? 'text-yellow-500' : 'text-green-500'
                  } font-semibold text-red-100`}
                >
                  {status}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={status !== 'pending'}
            className="mt-8 w-full px-6 py-3 bg-red-600 text-white rounded-2xl font-bold shadow-[0_6px_20px_rgba(255,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(255,0,0,0.5)] hover:scale-105 transition-all disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-[0_0px_0px_rgba(255,0,0,0.5)]"
          >
            Donate
          </button>
        </div>

        {/* Image */}
        <div className="flex col-span-1 justify-center md:justify-start items-center">
          <div className="rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(255,0,0,0.3)] hover:scale-105 transition-transform duration-500 w-full max-w-md h-full py-20">
            <img
              src="https://i.ibb.co/qMLcFdxg/pngwing-com-2.png"
              alt="Blood Donation"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white/90 dark:bg-[#1a1a1a]/80 backdrop-blur-xl p-8 rounded-3xl max-w-md w-full shadow-[0_12px_35px_rgba(255,0,0,0.25)]">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              Confirm Donation
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-red-100">
                  Donor Name
                </label>
                <input
                  type="text"
                  value="Maha Hasan"
                  readOnly
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-red-100">
                  Donor Email
                </label>
                <input
                  type="email"
                  value="maha@example.com"
                  readOnly
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
              <button
                onClick={handleConfirmDonation}
                className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-lg transition-all"
              >
                Confirm Donation
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-2 px-6 py-3 bg-gray-300 text-gray-800 rounded-2xl font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DonationRequestDetails;
