import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import {
  ArrowLeft,
  MapPin,
  Hospital,
  Calendar,
  Clock,
  User,
  Droplets,
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const {
    data: requestData = {},
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['singleRequest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleConfirmDonation = async () => {
    const donorInfo = { name: user?.displayName, email: user?.email };
    const res = await axiosSecure.patch(`/donationRequests/${id}/status`, {
      status: 'inprogress',
      donor: donorInfo,
    });
    if (res.data.modifiedCount) {
      await refetch();
      setShowModal(false);
      Swal.fire({
        title: 'Thank You!',
        text: 'You have successfully opted to donate.',
        icon: 'success',
        confirmButtonColor: '#d33',
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-center py-20 text-error font-bold">
        Something went wrong. Please try again.
      </div>
    );

  const statusColors = {
    pending: 'badge-warning',
    inprogress: 'badge-info',
    done: 'badge-success',
    canceled: 'badge-error',
  };

  return (
    <section className="min-h-screen bg-base-100 py-12 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} /> Back to Requests
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-base-200 shadow-sm border border-base-300 rounded-3xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-black text-base-content mb-2">
                    Request Details
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Please review the information carefully before donating.
                  </p>
                </div>
                <div
                  className={`badge ${
                    statusColors[requestData.status]
                  } badge-outline p-4 font-bold uppercase tracking-wider`}
                >
                  {requestData.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <DetailBox
                  icon={<User size={18} />}
                  label="Recipient"
                  value={requestData.recipientName}
                />
                <DetailBox
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={`${requestData.upazila}, ${requestData.district}`}
                />
                <DetailBox
                  icon={<Hospital size={18} />}
                  label="Hospital"
                  value={requestData.hospitalName}
                />
                <DetailBox
                  icon={<Calendar size={18} />}
                  label="Donation Date"
                  value={requestData.donationDate}
                />
                <DetailBox
                  icon={<Clock size={18} />}
                  label="Time"
                  value={requestData.donationTime}
                />
                <DetailBox
                  icon={<MapPin size={18} />}
                  label="Full Address"
                  value={requestData.fullAddress}
                />
              </div>

              <div className="mt-8 p-6 bg-base-100 rounded-2xl border border-dashed border-base-300">
                <p className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2">
                  <MessageCircle size={14} /> Note from Requester
                </p>
                <p className="text-base-content italic">
                  "
                  {requestData.requestMessage ||
                    'No additional message provided.'}
                  "
                </p>
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-red-600 text-white rounded-3xl p-8 shadow-xl shadow-red-200 dark:shadow-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Droplets size={32} />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-80 uppercase tracking-widest">
                    Group Needed
                  </p>
                  <h2 className="text-4xl font-black">
                    {requestData.bloodGroup}
                  </h2>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-8 opacity-90 font-medium">
                Your donation can save a life. By clicking 'Donate Now', you
                agree to be present at the hospital on time.
              </p>
              <button
                onClick={() => setShowModal(true)}
                disabled={requestData.status !== 'pending'}
                className="w-full py-4 bg-white text-red-600 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all active:scale-95 disabled:bg-red-400 disabled:text-white disabled:cursor-not-allowed shadow-lg"
              >
                {requestData.status === 'pending'
                  ? 'Donate Now'
                  : 'Not Available'}
              </button>
            </div>

            <div className="bg-base-200 border border-base-300 rounded-3xl p-6 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Emergency Contact
              </p>
              <p className="text-sm font-bold">
                Contact info will be visible after confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modern Tactical Modal - Enhanced Width & Auto Height */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            {/* Dynamic Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[10px]"
              onClick={() => setShowModal(false)}
            ></motion.div>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-base-100 border border-base-300 shadow-2xl rounded-[3rem] max-w-2xl w-full overflow-hidden h-auto p-8 md:p-12"
            >
              {/* Top Branding Line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-red-500 to-primary/80"></div>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* Left: Branding & Status */}
                <div className="w-full md:w-2/5 text-center md:text-left space-y-6">
                  <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto md:mx-0 shadow-inner group transition-all">
                    <Droplets
                      size={48}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black tracking-tighter text-base-content leading-[0.9]">
                      Confirm <br />
                      <span className="text-primary italic">Donation.</span>
                    </h3>
                    <p className="mt-4 text-sm font-bold text-base-content/40 uppercase tracking-widest">
                      Life-Saving Protocol
                    </p>
                  </div>
                </div>

                {/* Right: Vertical Fields & Actions */}
                <div className="w-full md:w-3/5 space-y-8">
                  <div className="space-y-4">
                    {/* Field 1: Name */}
                    <div className="relative group">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 ml-1">
                        Donor Full Name
                      </p>
                      <div className="flex items-center gap-4 p-5 bg-base-200/50 rounded-3xl border border-transparent group-focus-within:border-primary/30 transition-all shadow-inner">
                        <User size={20} className="text-base-content/20" />
                        <input
                          readOnly
                          value={user?.displayName}
                          className="bg-transparent border-none outline-none cursor-not-allowed font-black text-base-content w-full"
                        />
                      </div>
                    </div>

                    {/* Field 2: Email */}
                    <div className="relative group">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 ml-1">
                        Verified Email Address
                      </p>
                      <div className="flex items-center gap-4 p-5 bg-base-200/50 rounded-3xl border border-transparent group-focus-within:border-primary/30 transition-all shadow-inner">
                        <Mail size={20} className="text-base-content/20" />
                        <input
                          readOnly
                          value={user?.email}
                          className="bg-transparent border-none outline-none font-black text-base-content w-full text-sm cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 pt-4">
                    <button
                      onClick={handleConfirmDonation}
                      className="btn btn-primary h-16 rounded-3xl font-black text-lg shadow-xl shadow-primary/20 border-none group"
                    >
                      <span>YES, I'LL BE THERE</span>
                      <CheckCircle2
                        size={20}
                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    </button>

                    <button
                      onClick={() => setShowModal(false)}
                      className="btn btn-ghost h-14 font-black text-base-content/30 hover:text-error transition-all"
                    >
                      DISMISS
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Reusable Detail Component
const DetailBox = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-base-200 rounded-xl text-red-600">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-0.5">
        {label}
      </p>
      <p className="font-bold text-base-content">{value}</p>
    </div>
  </div>
);

export default DonationRequestDetails;
