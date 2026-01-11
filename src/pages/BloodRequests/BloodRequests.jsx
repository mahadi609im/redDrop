import React, { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpin from '../../Components/Loading/LoadingSpin';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Droplets,
  ArrowUpRight,
  Search,
  Filter,
  X,
} from 'lucide-react';

const BloodRequests = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { loading } = use(AuthContext);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['pendingDonationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/pending`);
      return res.data;
    },
  });

  // Filter Logic
  const filteredRequests = requests.filter(req => {
    const matchesSearch =
      req.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup =
      selectedGroup === 'All' || req.bloodGroup === selectedGroup;

    return req.status === 'pending' && matchesSearch && matchesGroup;
  });

  if (loading || isLoading) return <LoadingSpin />;

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 lg:px-20 bg-base-100 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-10 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10"></div>

      {/* --- Header --- */}
      <div className="relative z-10 text-center mb-12 animate-fadeIn">
        <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <p className="text-[10px] font-black text-primary tracking-[0.2em] flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            URGENT REQUESTS
          </p>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent tracking-tighter">
          Pending Blood Requests
        </h1>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="max-w-5xl mx-auto mb-16 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative grow group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, district or hospital..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-12 py-5 bg-base-200 border border-base-300 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-base-100 transition-all font-medium text-base-content shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Desktop Blood Group Dropdown */}
          <div className="relative min-w-[180px]">
            <Filter
              className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/40"
              size={18}
            />
            <select
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
              className="w-full pl-12 pr-6 py-5 bg-base-200 border border-base-300 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 appearance-none font-bold text-base-content shadow-sm cursor-pointer"
            >
              {bloodGroups.map(bg => (
                <option key={bg} value={bg} className="bg-base-100">
                  {bg === 'All' ? 'All Groups' : bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mr-2">
            Quick Filter:
          </p>
          {bloodGroups.map(bg => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`px-5 py-2 rounded-full text-xs font-black tracking-wider transition-all border ${
                selectedGroup === bg
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-base-100 border-base-300 text-base-content/50 hover:border-primary hover:text-primary'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID LIST --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRequests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 bg-base-200 rounded-[2.5rem] border border-dashed border-base-300"
            >
              <Droplets
                className="mx-auto text-base-content/20 mb-3"
                size={40}
              />
              <p className="text-base-content/40 text-sm font-bold">
                No matching requests found.
              </p>
            </motion.div>
          ) : (
            filteredRequests.map(req => (
              <motion.div
                layout
                key={req._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group bg-base-100 border border-base-300 rounded-4xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
              >
                {/* Blood Group Display */}
                <div className="relative h-40 w-full bg-base-200 rounded-3xl mb-6 flex items-center justify-center overflow-hidden group-hover:bg-primary transition-colors duration-500 shadow-inner">
                  <span className="absolute text-6xl font-black text-base-content/5 group-hover:text-white/10 transition-colors">
                    {req.bloodGroup}
                  </span>
                  <span className="relative z-10 text-5xl font-black text-primary group-hover:text-white transition-colors duration-500">
                    {req.bloodGroup}
                  </span>
                </div>

                {/* Info Section */}
                <div className="grow">
                  <h3 className="text-xl font-black text-base-content mb-2 truncate group-hover:text-primary transition-colors">
                    {req.recipientName}
                  </h3>
                  <div className="flex items-center gap-2 text-base-content/50 mb-6">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {req.district}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-base-300 pt-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={12} /> Date
                      </p>
                      <p className="text-xs font-bold text-base-content/80">
                        {req.donationDate}
                      </p>
                    </div>
                    <div className="space-y-1 border-l border-base-300 pl-4">
                      <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={12} /> Time
                      </p>
                      <p className="text-xs font-bold text-base-content/80">
                        {req.donationTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    Pending
                  </span>
                  <button
                    onClick={() => navigate(`/blood-details/${req._id}`)}
                    className="w-10 h-10 rounded-full bg-base-content text-base-100 flex items-center justify-center group-hover:bg-primary transition-all group-hover:scale-110 shadow-lg cursor-pointer"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer Status */}
      <div className="mt-12 flex justify-center">
        <div className="px-6 py-2 bg-base-200 rounded-full border border-base-300 shadow-sm flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
            {filteredRequests.length} matching results
          </span>
        </div>
      </div>
    </section>
  );
};

export default BloodRequests;
