import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const WallOfFame = () => {
  const axiosSecure = useAxiosSecure();
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const res = await axiosSecure.get('/donors');
        setTopDonors(res.data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTopDonors();
  }, [axiosSecure]);

  if (loading) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="conCls">
        {/* Updated Header with Paragraph */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-red-600 mb-3"
            >
              <div className="w-6 h-[2px] bg-red-600 rounded-full"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                Recognition
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-5">
              Top <span className="text-red-600 relative">Donors</span>
            </h2>

            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-lg">
              Every drop counts, but these individuals have gone above and
              beyond. We celebrate our most frequent donors who lead the way in
              saving lives and inspiring others through their selfless
              contributions.
            </p>
          </div>

          <Link
            to="/donors"
            className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-all duration-300"
          >
            View All Donors
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500 shadow-sm">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDonors.map((donor, idx) => (
            <motion.div
              key={donor._id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-[#F9F9F9] rounded-4xl p-1.5 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              <div className="bg-white rounded-[28px] p-6 h-full flex flex-col items-center border border-gray-50 group-hover:border-transparent">
                {/* Profile Section */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-gray-100">
                    <img
                      src={donor.photoURL || 'https://via.placeholder.com/150'}
                      className="w-full h-full object-cover"
                      alt={donor.displayName}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-md text-red-600">
                    <Heart size={14} fill="currentColor" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center w-full">
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors truncate px-2">
                    {donor.displayName}
                  </h3>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between mt-5 px-3 py-3 bg-gray-50/50 rounded-2xl group-hover:bg-red-50/30 transition-colors">
                    <div className="text-left">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">
                        Blood
                      </p>
                      <p className="text-sm font-black text-red-600">
                        {donor.bloodGroup}
                      </p>
                    </div>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <div className="text-right">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">
                        Region
                      </p>
                      <p className="text-[11px] font-bold text-gray-600 truncate max-w-[70px]">
                        {donor.district || 'Verified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Verification */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                    <ShieldCheck size={10} /> Certified Lifesaver
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfFame;
