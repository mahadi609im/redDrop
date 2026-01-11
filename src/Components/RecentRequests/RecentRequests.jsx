import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { MapPin, Calendar, Clock, Hospital } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RecentRequests = () => {
  const axiosPublic = useAxiosSecure();

  // Load only pending requests for the home page
  const { data: pendingRequests = [], isLoading } = useQuery({
    queryKey: ['pendingRequestsHome'],
    queryFn: async () => {
      const res = await axiosPublic.get('/donationRequests/pending');
      return res.data;
    },
  });

  // Display only first 3 requests for a clean look
  const displayRequests = pendingRequests.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <section className="py-20 bg-base-100">
      <div className="conCls">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-base-content leading-tight">
              Emergency <span className="text-red-600">Blood Requests</span>
            </h2>
            <p className="text-gray-500 max-w-md">
              A small act of yours can be a lifeline for someone. Check the
              latest requests and respond if you can.
            </p>
          </div>
          <Link
            to="/blood-requests"
            className="w-fit px-6 py-2.5 rounded-full border-2 border-red-600 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95"
          >
            View All Requests
          </Link>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRequests.length > 0 ? (
            displayRequests.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group bg-base-100 rounded-3xl p-6 border border-base-300 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-500 overflow-hidden"
              >
                {/* Blood Group Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-red-600 text-white px-6 py-2 rounded-bl-3xl font-black text-xl">
                    {request.bloodGroup}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                      {request.recipientName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                      <MapPin size={14} className="text-red-500" />
                      <span className="text-xs font-medium">
                        {request.district}, {request.upazila}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 py-4 border-y border-base-content/10">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Hospital size={16} className="text-red-400" />
                      <span className="truncate">{request.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar size={16} className="text-red-400" />
                      <span>{request.donationDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock size={16} className="text-red-400" />
                      <span>{request.donationTime}</span>
                    </div>
                  </div>

                  <Link
                    to={`/blood-details/${request._id}`}
                    className="block w-full text-center py-3.5 rounded-2xl bg-base-200 text-base-content font-bold group-hover:bg-primary group-hover:text-primary-content transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-base-200 rounded-3xl">
              <p className="text-base-content/60 font-medium">
                No pending requests at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentRequests;
