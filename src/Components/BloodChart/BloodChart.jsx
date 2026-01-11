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
    <section className="py-24 bg-base-100 transition-colors duration-500 select-none overflow-hidden relative">
      {/* Dynamic Glows - Night-safe opacity */}
      <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="conCls">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
          {/* Left Side: Header */}
          <div className="relative text-left">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="text-primary w-4 h-4 animate-pulse" />
              <span className="text-primary font-black tracking-[0.2em] md:tracking-[0.3em] text-[10px] uppercase">
                Compatibility Matrix
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-base-content leading-none tracking-tighter italic uppercase">
              Blood{' '}
              <span className="text-primary not-italic tracking-normal">
                Circle
              </span>
            </h2>
          </div>

          {/* Right Side: Description */}
          <div className="max-w-sm">
            <p className="text-base-content/60 font-medium text-sm leading-relaxed border-l-2 border-primary/30 pl-5 md:pl-6 italic text-left">
              Discover how each blood group connects within our life-saving
              network. Precision in compatibility saves lives.
            </p>
          </div>
        </div>

        {/* Compatibility Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {compatibility.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative ${item.size} ${item.mt} group`}
            >
              {/* Card Background with Theme support */}
              <div className="absolute inset-0 bg-base-200/50 backdrop-blur-md border border-base-300 rounded-[3rem] group-hover:rounded-[1.5rem] rounded-tl-none transition-all duration-500 shadow-xl group-hover:shadow-primary/20 group-hover:bg-primary group-hover:border-primary" />

              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-5xl font-black text-base-content group-hover:text-primary-content transition-colors duration-300 italic tracking-tighter">
                    {item.type}
                  </span>
                  <Droplets className="w-6 h-6 text-primary group-hover:text-primary-content transition-colors" />
                </div>

                <div className="space-y-4">
                  <div className="bg-base-300/50 group-hover:bg-white/10 p-3 rounded-2xl transition-colors">
                    <span className="block text-[10px] font-black text-primary group-hover:text-primary-content/80 uppercase tracking-widest mb-1">
                      Give To
                    </span>
                    <p className="text-xs font-bold text-base-content group-hover:text-primary-content transition-colors leading-tight">
                      {item.give}
                    </p>
                  </div>

                  <div className="bg-base-300/50 group-hover:bg-white/10 p-3 rounded-2xl transition-colors">
                    <span className="block text-[10px] font-black text-base-content/40 group-hover:text-primary-content/80 uppercase tracking-widest mb-1">
                      Receive
                    </span>
                    <p className="text-xs font-bold text-base-content group-hover:text-primary-content transition-colors leading-tight">
                      {item.receive}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Universal Donor Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative p-8 bg-base-200/40 backdrop-blur-lg border border-base-300 rounded-[2.5rem] flex items-center gap-8 shadow-2xl group transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-inner group-hover:shadow-primary/40 group-hover:rotate-6">
              <Share2 className="w-8 h-8 text-primary group-hover:text-primary-content transition-colors" />
            </div>

            <div className="flex flex-col relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-black uppercase tracking-widest">
                  Universal Donor
                </span>
              </div>
              <h5 className="font-black text-base-content text-2xl tracking-tighter italic leading-none mb-2">
                Group O Negative
              </h5>
              <p className="text-base-content/50 text-xs font-medium italic">
                The most critical blood type, compatible with all patients.
              </p>
            </div>
          </motion.div>

          {/* Universal Recipient Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative p-8 bg-base-200/40 backdrop-blur-lg border border-base-300 rounded-[2.5rem] flex items-center gap-8 shadow-2xl group transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-20 h-20 shrink-0 bg-base-content/5 rounded-[2rem] flex items-center justify-center group-hover:bg-base-content transition-all duration-500 shadow-inner group-hover:shadow-black/40 group-hover:-rotate-6">
              <ShieldCheck className="w-8 h-8 text-base-content group-hover:text-base-100 transition-colors" />
            </div>

            <div className="flex flex-col relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-base-content/10 text-base-content/60 rounded text-[9px] font-black uppercase tracking-widest">
                  Universal Recipient
                </span>
              </div>
              <h5 className="font-black text-base-content text-2xl tracking-tighter italic leading-none mb-2">
                Group AB Positive
              </h5>
              <p className="text-base-content/50 text-xs font-medium italic">
                A versatile group that can safely receive from any donor.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BloodChart;
