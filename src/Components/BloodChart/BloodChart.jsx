import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Share2, ShieldCheck, Activity } from 'lucide-react';

const BloodChart = () => {
  const compatibility = [
    {
      type: 'A+',
      give: 'A+, AB+',
      receive: 'A+, A-, O+, O-',
      size: 'h-56',
      mt: 'mt-0',
    },
    {
      type: 'A-',
      give: 'A±, AB±',
      receive: 'A-, O-',
      size: 'h-60',
      mt: 'mt-6',
    },
    {
      type: 'B+',
      give: 'B+, AB+',
      receive: 'B+, B-, O+, O-',
      size: 'h-56',
      mt: 'mt-0',
    },
    {
      type: 'B-',
      give: 'B±, AB±',
      receive: 'B-, O-',
      size: 'h-60',
      mt: 'mt-6',
    },
    {
      type: 'AB+',
      give: 'AB+ Only',
      receive: 'Everyone',
      size: 'h-60',
      mt: 'mt-0',
    },
    {
      type: 'AB-',
      give: 'AB±',
      receive: 'AB-, A-, B-, O-',
      size: 'h-56',
      mt: 'mt-6',
    },
    {
      type: 'O+',
      give: 'O+, A+, B+, AB+',
      receive: 'O+, O-',
      size: 'h-60',
      mt: 'mt-0',
    },
    {
      type: 'O-',
      give: 'Everyone',
      receive: 'O- Only',
      size: 'h-56',
      mt: 'mt-6',
    },
  ];

  return (
    <section className="py-12 bg-[#fffafa] select-none overflow-hidden relative">
      {/* Subtle Glows - Reduced Opacity */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="conCls">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-red-600 w-4 h-4" />
              <span className="text-red-600 font-bold tracking-widest text-[10px] uppercase">
                Compatibility Matrix
              </span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 leading-none tracking-tighter">
              Blood <span className="text-red-600">Circle</span>
            </h2>
          </div>
          <p className="max-w-sm text-gray-500 font-medium text-sm leading-snug border-l-2 border-red-600 pl-4">
            Discover how each blood group connects within our life-saving
            network. Knowing your compatibility is key.
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {compatibility.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative ${item.size} ${item.mt} group`}
            >
              <div className="absolute inset-0 bg-white border border-red-50 rounded-[2.5rem] group-hover:rounded-[1.5rem] rounded-tl-none transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:bg-red-600 group-hover:border-red-600" />

              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-4xl font-black text-gray-900 group-hover:text-white transition-colors duration-300">
                    {item.type}
                  </span>
                  <Droplets className="w-5 h-5 text-red-600 group-hover:text-red-100 transition-colors" />
                </div>

                <div className="space-y-3">
                  <div className="bg-red-50/50 group-hover:bg-white/10 p-2.5 rounded-xl transition-colors">
                    <span className="block text-[9px] font-black text-red-600 group-hover:text-red-200 uppercase tracking-wider mb-0.5">
                      Give To
                    </span>
                    <p className="text-xs font-bold text-gray-800 group-hover:text-white transition-colors leading-tight">
                      {item.give}
                    </p>
                  </div>

                  <div className="bg-blue-50/50 group-hover:bg-white/10 p-2.5 rounded-xl transition-colors">
                    <span className="block text-[9px] font-black text-blue-600 group-hover:text-red-200 uppercase tracking-wider mb-0.5">
                      Receive From
                    </span>
                    <p className="text-xs font-bold text-gray-800 group-hover:text-white transition-colors leading-tight">
                      {item.receive}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern & Sleek Footer Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Universal Donor Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            className="relative p-5 bg-white border border-red-100 rounded-[2rem] flex items-center gap-6 shadow-[0_15px_40px_-15px_rgba(220,38,38,0.1)] group transition-all duration-300"
          >
            {/* Decorative Soft Red Gradient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Modern Red Icon Box */}
            <div className="w-16 h-16 shrink-0 bg-red-50 rounded-3xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500 shadow-sm group-hover:shadow-red-200 group-hover:shadow-xl">
              <Share2 className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-500" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em]">
                  Universal Donor
                </span>
              </div>
              <h5 className="font-black text-gray-900 text-xl tracking-tight leading-none mb-1">
                Group O Negative
              </h5>
              <p className="text-gray-400 text-xs font-medium">
                Compatible with all blood types
              </p>
            </div>
          </motion.div>

          {/* Universal Recipient Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            className="relative p-5 bg-white border border-gray-100 rounded-[2rem] flex items-center gap-6 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] group transition-all duration-300"
          >
            {/* Decorative Soft Gray Gradient Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Modern Dark Icon Box */}
            <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-3xl flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-500 shadow-sm group-hover:shadow-gray-200 group-hover:shadow-xl">
              <ShieldCheck className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors duration-500" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Universal Recipient
                </span>
              </div>
              <h5 className="font-black text-gray-900 text-xl tracking-tight leading-none mb-1">
                Group AB Positive
              </h5>
              <p className="text-gray-400 text-xs font-medium">
                Can receive from all blood types
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BloodChart;
