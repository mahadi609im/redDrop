import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Eye,
  Database,
  Share2,
  Trash2,
  Smartphone,
  ArrowDown,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router';

const PrivacyPolicy = () => {
  const policySections = [
    {
      id: 'collection',
      icon: <Eye size={22} />,
      title: 'Data Collection',
      desc: 'What we collect from you',
      content:
        'We collect personal details like blood group, medical history, and contact info to ensure safe donation matching. Every piece of data is stored in ultra-secure, encrypted environments.',
    },
    {
      id: 'security',
      icon: <Shield size={22} />,
      title: 'Security Protocols',
      desc: 'How we protect your data',
      content:
        'Your data is encrypted using AES-256 standards. Only verified medical professionals and authorized coordinators can access your sensitive info during an emergency.',
    },
    {
      id: 'usage',
      icon: <Database size={22} />,
      title: 'Data Usage',
      desc: 'Why we need your info',
      content:
        'We use your real-time location to find nearby hospitals and your phone number to send life-saving donation alerts. We never sell your data to third-party marketers.',
    },
    {
      id: 'retention',
      icon: <Trash2 size={22} />,
      title: 'Your Rights',
      desc: 'Control over your data',
      content:
        'You have the ultimate authority over your data. You can request a permanent deletion of your account and all medical records from our servers at any time.',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary/20 selection:text-primary">
      <header className="relative pb-64 px-6 bg-base-100 overflow-hidden pt-8 md:pt-12">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Soft Primary Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            <ShieldCheck size={16} />
            <span>Privacy & Security</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tight"
          >
            Your Privacy is <span className="text-primary">Our Priority.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-base-content/60 max-w-2xl mx-auto leading-relaxed"
          >
            We've built RedDrop with security at its core. Understand how we
            protect your medical data and ensure a safe donation experience for
            everyone.
          </motion.p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 text-primary/40 flex justify-center"
          >
            <ArrowDown size={28} strokeWidth={2} />
          </motion.div>
        </div>

        {/* Bottom Fade to blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100 to-transparent z-10" />
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-48 pb-32 relative z-20">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Side: Sticky Sidebar */}
          <aside className="lg:w-[35%] lg:sticky lg:top-10">
            <div className="space-y-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-base-content text-base-100 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl border border-white/5"
              >
                <div className="relative z-10">
                  <h4 className="font-black text-2xl mb-4 italic">
                    Quick Audit
                  </h4>
                  <p className="opacity-60 text-xs font-medium leading-relaxed mb-8">
                    Don't have time for the full legal text? Here are the three
                    pillars of our privacy framework.
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        t: 'Zero Selling',
                        d: 'Data is never sold to 3rd parties.',
                        c: 'text-primary',
                      },
                      {
                        t: 'Military Grade',
                        d: 'AES-256 Encryption at rest.',
                        c: 'text-blue-500',
                      },
                      {
                        t: 'Your Choice',
                        d: 'One-click account deletion.',
                        c: 'text-green-500',
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div
                          className={`w-1 h-10 rounded-full ${item.c.replace(
                            'text',
                            'bg'
                          )}`}
                        />
                        <div>
                          <h5
                            className={`text-[11px] font-black uppercase tracking-widest ${item.c}`}
                          >
                            {item.t}
                          </h5>
                          <p className="text-[10px] font-bold opacity-60">
                            {item.d}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
              </motion.div>

              <nav className="p-6 bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm hidden lg:block">
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em] mb-6 px-4">
                  Sections
                </p>
                <div className="space-y-1">
                  {policySections.map(section => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-primary/10 transition-all group"
                    >
                      <span className="text-base-content/20 group-hover:text-primary transition-colors">
                        {section.icon}
                      </span>
                      <span className="text-xs font-black text-base-content/60 uppercase tracking-wider group-hover:text-base-content transition-colors">
                        {section.title}
                      </span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          {/* Right Side: Detailed Sections */}
          <div className="lg:w-[65%] space-y-16 pt-2">
            {policySections.map((section, idx) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="hidden md:flex flex-col items-center pt-2">
                    <div className="w-14 h-14 rounded-3xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content group-hover:bg-primary group-hover:text-primary-content group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500 z-10 relative">
                      {section.icon}
                    </div>
                    {idx !== policySections.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-base-300 to-transparent -mt-2 pb-16" />
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block pl-2">
                      {section.desc}
                    </span>
                    <h2 className="text-3xl font-black text-base-content mb-6 tracking-tight italic pl-2">
                      {section.title}
                    </h2>

                    <div className="bg-base-100 rounded-[2.5rem] border border-base-300 p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-base-300/50 transition-all duration-500">
                      <p className="text-base-content/70 leading-relaxed font-medium text-base">
                        {section.content}
                      </p>

                      <div className="mt-8 pt-8 border-t border-base-300 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-xl text-[10px] font-black text-base-content/50 uppercase tracking-tight">
                          <Smartphone size={14} className="text-primary" />
                          End-to-End Encryption
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-xl text-[10px] font-black text-base-content/50 uppercase tracking-tight">
                          <Share2 size={14} className="text-primary" /> GDPR
                          Compliant
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}

            {/* Bottom Contact Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-primary rounded-[3rem] p-12 text-center text-primary-content relative overflow-hidden shadow-2xl shadow-primary/20 md:ml-20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <h4 className="text-3xl font-black mb-4 tracking-tighter italic">
                Still concerned about privacy?
              </h4>
              <p className="text-primary-content/80 font-medium mb-10 opacity-80 max-w-lg mx-auto">
                Our Data Protection Officer is ready to clarify any technical or
                legal questions you might have.
              </p>
              <Link
                to="/report-an-issue"
                className="bg-base-content text-base-100 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-base-100 hover:text-primary transition-all shadow-xl"
              >
                Contact Privacy Team
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
