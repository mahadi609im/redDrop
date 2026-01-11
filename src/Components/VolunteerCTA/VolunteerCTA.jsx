import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Heart, ArrowUpRight, Zap, HandHeart } from 'lucide-react';

const VolunteerCTA = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Artistic Visuals (5 cols) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative h-[450px] w-full flex items-center justify-center">
              {/* Central Organic Shape */}
              <motion.div
                animate={{
                  borderRadius: [
                    '40% 60% 70% 30% / 40% 50% 60% 50%',
                    '60% 40% 30% 70% / 50% 30% 70% 50%',
                    '40% 60% 70% 30% / 40% 50% 60% 50%',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-72 h-72 bg-red-50 border-2 border-red-100 flex justify-center items-center"
              >
                <img
                  src="https://i.ibb.co.com/KpvHb7wD/pngwing-com-1.png"
                  alt="Donation"
                  className="w-3/4 h-auto object-cover animate-pulse"
                />
              </motion.div>

              {/* Floating Action Cards */}
              <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: -20 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
                className="absolute top-10 left-0 bg-base-100 p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-base-300 flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-content">
                  <HandHeart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Support
                  </p>
                  <p className="text-sm font-black text-base-content">
                    Direct Impact
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20 }}
                whileInView={{ x: 20 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
                className="absolute bottom-10 right-0 bg-base-100 p-6 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-base-300 z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-base-100 bg-base-300 overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?u=${i * 10}`}
                          alt="v"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-black text-base-content">
                    +2.4k
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-400">
                  Volunteers Joined Today
                </p>
              </motion.div>

              {/* Decorative Icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/4 right-1/4 text-red-200"
              >
                <Zap className="w-10 h-10 fill-current" />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Clean Content (7 cols) */}
          <div className="lg:col-span-7 space-y-10 order-1 lg:order-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-12 h-0.5 bg-red-600 rounded-full" />
                <span className="text-red-600 font-black text-xs uppercase tracking-[0.3em]">
                  Volunteer Network
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black text-base-content tracking-tighter leading-[0.95] mb-8">
                Your presence <br />
                is a <span className="text-red-600">Gift.</span>
              </h2>

              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                The world needs more than just blood donors. We need planners,
                organizers, and advocates. Join our mission and become the
                backbone of life-saving operations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#000' }}
                className="w-full sm:w-auto px-10 py-5 bg-base-content text-base-100 rounded-full font-black flex items-center justify-center gap-3 group transition-all"
              >
                Start Volunteering
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>

              <button className="flex items-center gap-2 text-base-content font-black hover:text-red-600 transition-colors">
                <Users2 className="w-5 h-5" />
                View Opportunities
              </button>
            </div>

            {/* Feature Mini-Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-2xl font-black text-base-content">0%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Cost to Join
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-base-content">24/7</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Active Support
                </p>
              </div>
              <div className="hidden md:block">
                <p className="text-2xl font-black text-base-content">Global</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Reach Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;
