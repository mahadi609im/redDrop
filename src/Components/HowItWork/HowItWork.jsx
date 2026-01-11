import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Droplets, HeartHandshake } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

const HowItWorks = () => {
  const { user } = useContext(AuthContext);
  const steps = [
    {
      id: 1,
      title: 'Register Profile',
      description:
        'Create a donor account with your blood group and location details.',
      icon: <UserPlus className="w-8 h-8" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 2,
      title: 'Search/Request',
      description: 'Find donors near you or post an emergency blood request.',
      icon: <Search className="w-8 h-8" />,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      id: 3,
      title: 'Connect & Donate',
      description:
        'Coordinate with the requester and visit the hospital to donate.',
      icon: <Droplets className="w-8 h-8" />,
      color: 'bg-red-50 text-red-600',
    },
    {
      id: 4,
      title: 'Save a Life',
      description:
        'Your contribution helps someone get a second chance at life.',
      icon: <HeartHandshake className="w-8 h-8" />,
      color: 'bg-green-50 text-green-600',
    },
  ];

  return (
    <section className="py-20 bg-base-200/50">
      <div className="conCls">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3"
          >
            Process
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-base-content"
          >
            How <span className="text-red-600">RedDrop</span> Works
          </motion.h2>
          <p className="text-gray-500 mt-4">
            Follow these simple steps to become a hero or find help during
            emergencies.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-dashed bg-linear-to-r from-transparent via-base-content/10 to-transparent z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div
                className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                {step.icon}
              </div>

              {/* Step Number Badge */}
              <div className="absolute top-0 right-1/4 md:right-1/3 bg-base-100 w-8 h-8 rounded-full shadow-md flex items-center justify-center text-sm font-black text-base-content">
                {step.id}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 italic mb-6">
            "Opportunities to save a life don't come every day."
          </p>
          {user ? (
            <>
              <Link
                to="/donors"
                className="btn btn-wide bg-red-600 hover:bg-red-700 text-white border-none rounded-xl"
              >
                Search Request
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-wide bg-red-600 hover:bg-red-700 text-white border-none rounded-xl"
              >
                Get Started Now
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
