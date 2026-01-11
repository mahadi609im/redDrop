import React from 'react';
import { motion } from 'framer-motion';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="relative py-24 bg-base-100 overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50/50 rounded-full blur-[100px] -ml-32 -mb-32"></div>
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ef4444' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6zM36 4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 bg-red-50 rounded-full border border-red-100"
          >
            <span className="text-red-600 font-bold text-[10px] uppercase tracking-[0.2em]">
              Contact Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-base-content tracking-tighter"
          >
            Let's Start a <span className="text-red-600">Conversation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Have questions about blood donation or volunteering? Our team is
            here to help you make an impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {[
              {
                icon: <FaPhoneAlt />,
                title: 'Phone',
                details: '+880 1700 000 000',
                bg: 'bg-blue-50',
                color: 'text-blue-600',
              },
              {
                icon: <FaEnvelope />,
                title: 'Email',
                details: 'support@reddrop.com',
                bg: 'bg-red-50',
                color: 'text-red-600',
              },
              {
                icon: <FaMapMarkerAlt />,
                title: 'Location',
                details: 'Dhaka, Bangladesh',
                bg: 'bg-green-50',
                color: 'text-green-600',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-6 p-8 rounded-[2rem] bg-base-100 border border-base-300 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all group"
              >
                <div
                  className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xl font-black text-base-content">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Modern Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-base-100 p-8 md:p-12 rounded-[3rem] border border-base-300 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <form className="space-y-7 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-base-content ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base-content"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-base-content ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base-content"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-base-content ml-1">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-base-200 border border-transparent focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-base-content resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-primary/80 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-primary transition-all group"
                >
                  Send Message
                  <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>

              {/* Subtle Decorative Shape in Form */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-[100px] -z-0 opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
