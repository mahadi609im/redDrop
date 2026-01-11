import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  HelpCircle,
  Droplet,
  UserCheck,
  ShieldAlert,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
  PhoneCall,
  Globe,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const toggleFaq = index => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What should I eat and drink before donating blood?',
      a: "It's important to have a good meal and drink plenty of fluids, especially water, in the hours leading up to your donation. Avoid alcohol and caffeine before donating.",
    },
    {
      q: 'Can I donate blood if I recently got a tattoo or piercing?',
      a: 'In most regions, you must wait a certain period (e.g., 4 months to 1 year) after getting a tattoo or piercing to donate blood, due to infection risks. Please check local guidelines.',
    },
    {
      q: 'How will I feel after the donation, and what precautions should I take?',
      a: 'Most donors feel fine. We recommend resting for 10-15 minutes, drinking extra fluids, and avoiding heavy lifting or strenuous exercise for the rest of the day. Some minor dizziness is possible.',
    },
    {
      q: 'What are the general eligibility requirements for blood donation?',
      a: 'Typically, donors must be at least 17 years old (or 16 with parental consent), weigh at least 110 pounds, and be in good general health. Specific medical conditions or medications can affect eligibility.',
    },
    {
      q: 'How often can I donate whole blood?',
      a: 'For whole blood donation, you can generally donate every 56 days (8 weeks) in most countries to allow your body to replenish its iron stores.',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 selection:bg-primary/20 text-base-content">
      {/* --- HERO SECTION: Compact Ultra-Modern Design --- */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden bg-black mb-14">
        {/* background abstract shapes */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-10 -left-10 w-[350px] h-[350px] bg-primary rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-10 -right-10 w-[400px] h-[400px] bg-primary/40 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col items-center">
            {/* Floating Badge - Smaller size */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
            >
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                Knowledge Base 2.0
              </span>
            </motion.div>

            {/* Main Title - Reduced Size */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                HAVE A{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/60">
                  QUESTION?
                </span>
              </h1>
              <p className="mt-4 text-white/50 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
                Find answers to your blood donation queries in our centralized
                support hub. Expert advice simplified for you.
              </p>
            </motion.div>

            {/* Floating Search Bar Case - Compact & Slimmer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-2xl p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div className="relative flex items-center">
                <div className="absolute left-5 text-primary">
                  <Search size={18} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  placeholder="Search help topics..."
                  className="w-full bg-transparent border-none py-4 pl-12 pr-32 text-white text-sm font-semibold placeholder:text-white/30 focus:ring-0 outline-none"
                />
                <button className="absolute right-2 bg-primary hover:bg-primary/90 text-primary-content px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-primary/20">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Quick Tags - Smaller Font */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-3 text-[11px] font-bold uppercase tracking-widest"
            >
              <span className="text-white/40">Popular:</span>
              <button className="text-white/60 hover:text-primary transition-colors">
                #Eligibility
              </button>
              <span className="text-white/20">•</span>
              <button className="text-white/60 hover:text-primary transition-colors">
                #Recovery
              </button>
              <span className="text-white/20">•</span>
              <button className="text-white/60 hover:text-primary transition-colors">
                #Tattoo
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
      </section>

      {/* --- BENTO GRID CATEGORIES: Compact & Reorganized --- */}
      <section className="py-20 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Big Feature Card */}
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: '0 25px 50px rgba(220, 38, 38, 0.2)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 lg:row-span-2 bg-primary rounded-[3rem] p-10 text-primary-content relative overflow-hidden group flex flex-col justify-between"
            >
              <Droplet className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <HelpCircle size={28} />
                </div>
                <h2 className="text-3xl font-black mb-4 leading-tight">
                  New to <br />
                  Donation?
                </h2>
                <p className="text-primary-content/90 text-base font-medium max-w-xs">
                  Everything you need to know about your first blood donation
                  journey starts here.
                </p>
              </div>
              <motion.button
                onClick={() => navigate('/blood-requests')}
                className="bg-white text-primary w-fit px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest mt-8 flex items-center gap-2"
              >
                Start Here <ArrowUpRight size={16} />
              </motion.button>
            </motion.div>

            {/* 2. Right Side - Top Small Card (Category 1) */}
            <motion.a
              whileHover={{ y: -5 }}
              className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm flex flex-col justify-between group"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <UserCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-base-content mb-1">
                  Eligibility
                </h3>
                <p className="text-base-content/60 font-medium text-xs leading-relaxed">
                  Check if you are fit to donate.
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-base-content/20 group-hover:text-primary transition-colors mt-4"
              />
            </motion.a>

            {/* 3. Right Side - Top Small Card (Category 2) */}
            <motion.a
              whileHover={{ y: -5 }}
              className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm flex flex-col justify-between group"
            >
              <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-base-content mb-1">
                  Safety Protocols
                </h3>
                <p className="text-base-content/60 font-medium text-xs leading-relaxed">
                  Your health is our priority.
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="text-base-content/20 group-hover:text-primary transition-colors mt-4"
              />
            </motion.a>

            {/* 4. Support Card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              className="lg:col-span-2 bg-base-200 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden relative group border border-base-300 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_top_right,rgba(239,68,68,0.1),transparent)] pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      Live Support Available
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-base-content mb-2 tracking-tight group-hover:text-primary transition-colors italic">
                    Direct Assistance
                  </h3>
                  <p className="text-base-content/60 font-medium text-xs leading-relaxed max-w-[220px]">
                    Skip the search. Chat directly with our medical experts and
                    coordinators 24/7.
                  </p>
                </div>
                <div className="w-12 h-12 bg-base-100 border border-base-300 backdrop-blur-xl rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-500">
                  <MessageCircle size={22} strokeWidth={2.5} />
                </div>
              </div>

              <div className="flex items-end justify-between mt-10 relative z-10">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-widest">
                    Active Specialists
                  </span>
                  <div className="flex -space-x-3 items-center">
                    {[1, 2, 3, 4].map(i => (
                      <motion.img
                        whileHover={{ y: -5, zIndex: 10 }}
                        key={i}
                        className="w-10 h-10 rounded-full border-[3px] border-base-200 object-cover cursor-pointer"
                        src={`https://i.pravatar.cc/100?u=expert${i + 40}`}
                        alt="specialist"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full bg-base-300 border-[3px] border-base-200 flex items-center justify-center text-base-content text-[10px] font-black">
                      +12
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/report-an-issue')}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-content px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider flex items-center gap-2 shadow-lg hover:bg-primary/90 transition-all duration-300"
                >
                  Start Chat <ArrowUpRight size={14} strokeWidth={3} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION: Accordion Style --- */}
      <section className="py-20 px-6 bg-base-100 border-t border-base-300">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <MessageCircle className="text-primary" size={32} />
            <h2 className="text-3xl font-black text-base-content tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg md:text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className="text-base-content/40 group-hover:text-primary"
                      size={24}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="px-6 pb-6 md:px-8 md:pb-8"
                    >
                      <p className="text-base-content/70 leading-relaxed font-medium pt-2 border-t border-base-300">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA: Still Need Help --- */}
      <section className="py-20 px-6 bg-base-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className="text-4xl font-black text-primary-content mb-4 drop-shadow-lg">
              Can't find what you're looking for?
            </h2>
            <p className="text-primary-content/80 mb-8 max-w-lg mx-auto text-lg font-medium">
              Our dedicated support team is ready to assist you 24/7. Reach out
              directly for personalized help.
            </p>
            <motion.button
              onClick={() => navigate('/report-an-issue')}
              className="bg-white text-primary px-10 py-5 rounded-2xl font-black transition-all shadow-xl hover:shadow-primary-content/20 active:scale-95 text-lg"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Our Team
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
