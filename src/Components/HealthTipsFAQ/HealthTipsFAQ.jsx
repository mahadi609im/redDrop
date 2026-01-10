import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  Heart,
  Coffee,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

const HealthTipsFAQ = () => {
  const [activeTab, setActiveTab] = useState('before');
  const [openFaq, setOpenFaq] = useState(0);

  const tips = {
    before: [
      {
        icon: <Coffee className="w-5 h-5" />,
        text: 'Drink plenty of water and healthy fluids before donating blood.',
      },
      {
        icon: <Heart className="w-5 h-5" />,
        text: 'Ensure at least 7-8 hours of sound sleep the night before.',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5" />,
        text: 'Eat a nutritious meal; never donate blood on an empty stomach.',
      },
    ],
    after: [
      {
        icon: <ShieldAlert className="w-5 h-5" />,
        text: 'Rest for at least 15-20 minutes immediately after donation.',
      },
      {
        icon: <Plus className="w-5 h-5" />,
        text: 'Avoid heavy lifting or strenuous exercise for the next 24 hours.',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5" />,
        text: 'Consume iron-rich foods such as spinach, dates, or bananas.',
      },
    ],
  };

  const faqs = [
    {
      q: 'Is blood donation harmful to health?',
      a: 'Not at all! In fact, regular donation stimulates the production of new blood cells and can reduce the risk of heart disease.',
    },
    {
      q: 'How often can I donate blood?',
      a: 'A healthy individual can safely donate blood every 90 days or every 3 months.',
    },
    {
      q: 'How long does the process take?',
      a: 'The actual donation takes only 10-15 minutes—a small amount of time that can save someone’s life.',
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="conCls mx-auto px-6">
        {/* Centered Heading Section */}
        <div className="text-center relative mb-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10"
          />

          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <span className="text-red-600 font-bold tracking-[0.3em] text-[10px] uppercase bg-red-50 px-4 py-1.5 rounded-full">
              Donor Care Guide
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tighter">
            Essential{' '}
            <span className="text-red-600 relative inline-block">
              Health Tips
            </span>
          </h2>
          <p className="mt-6 text-gray-500 font-medium max-w-xl mx-auto text-sm md:text-base">
            Everything you need to know about the blood donation process to stay
            healthy and save lives effectively.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Educational Tips */}
          <div className="space-y-8">
            {/* Tab Switcher */}
            <div className="flex gap-2 p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-2xl w-fit">
              <button
                onClick={() => setActiveTab('before')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'before'
                    ? 'bg-white text-red-600 shadow-md scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Before Donation
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'after'
                    ? 'bg-white text-red-600 shadow-md scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                After Donation
              </button>
            </div>

            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  {tips[activeTab].map((tip, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md hover:border-red-100 transition-all group"
                    >
                      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        {tip.icon}
                      </div>
                      <p className="text-gray-700 font-bold text-sm leading-relaxed">
                        {tip.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-red-600 rounded-full" />
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Questions
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`group border rounded-[2rem] transition-all duration-500 overflow-hidden ${
                    openFaq === index
                      ? 'border-red-100 bg-red-50/30 shadow-lg'
                      : 'border-gray-100 bg-white hover:border-red-50'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full flex items-center justify-between p-7 text-left"
                  >
                    <span
                      className={`font-black text-base transition-colors duration-300 ${
                        openFaq === index ? 'text-red-600' : 'text-gray-800'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        openFaq === index
                          ? 'bg-red-600 text-white rotate-180 shadow-lg shadow-red-200'
                          : 'bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-red-400'
                      }`}
                    >
                      {openFaq === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'circOut' }}
                      >
                        <div className="px-7 pb-7 text-gray-500 text-sm leading-relaxed font-medium">
                          <div className="pt-4 border-t border-red-100/50">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTipsFAQ;
