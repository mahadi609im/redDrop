import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MapPin, ShieldCheck, HeartPulse } from 'lucide-react';

const features = [
  {
    title: 'Easy Registration',
    description:
      'Join as a blood donor in just a few steps and start saving lives today.',
    icon: <UserPlus className="w-8 h-8" />,
    gradient: 'from-red-500 to-rose-600',
  },
  {
    title: 'Find Donors Nearby',
    description:
      'Search for blood donors in your area instantly with our location-based system.',
    icon: <MapPin className="w-8 h-8" />,
    gradient: 'from-crimson-500 to-red-700', // Custom or tailwind red
  },
  {
    title: 'Safe & Secure',
    description:
      'All your personal information is protected and our platform is fully trustworthy.',
    icon: <ShieldCheck className="w-8 h-8" />,
    gradient: 'from-red-600 to-red-900',
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="conCls">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-4"
            >
              <HeartPulse size={16} />
              <span>Core Features</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
            >
              Why Choose <span className="text-red-600">RedDrop?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              Our platform makes blood donation simple, safe, and accessible for
              everyone. We bridge the gap between donors and those in need.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.15)] transition-all duration-500"
              >
                {/* Icon with Gradient Circle */}
                <div className="relative w-20 h-20 mb-8 mx-auto md:mx-0">
                  <div className="absolute inset-0 bg-red-600 opacity-10 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                  <div className="relative w-full h-full bg-white shadow-sm border border-red-50 rounded-3xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-relaxed font-light">
                  {feature.description}
                </p>

                {/* Decorative Corner Element */}
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
