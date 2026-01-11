import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Send,
  MessageSquare,
  ShieldAlert,
  Clock,
  ArrowRight,
  FileText,
  Mail,
  HelpCircle,
  Phone,
} from 'lucide-react';

const ReportAnIssue = () => {
  const [ticketStatus, setTicketStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = e => {
    e.preventDefault();
    setTicketStatus('sending');
    // Simulate API Call
    setTimeout(() => setTicketStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 pb-32">
      {/* --- HEADER SECTION --- */}
      <header className="relative pt-32 pb-48 px-6 bg-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-bold mb-6"
          >
            <ShieldAlert size={16} />
            <span>24/7 Support Response</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
          >
            Something not <span className="text-red-600">working?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-medium"
          >
            Report any bugs, safety concerns, or account issues. Our technical
            team usually reviews all reports within 24 hours.
          </motion.p>
        </div>
      </header>

      {/* --- MAIN FORM SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: The Form */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm"
            >
              {ticketStatus === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={40} />
                  </div>
                  <h2 className="text-3xl font-black mb-4">Report Received!</h2>
                  <p className="text-gray-500 font-medium mb-8">
                    Your ticket #RD-9241 has been created. We'll contact you via
                    email.
                  </p>
                  <button
                    onClick={() => setTicketStatus('idle')}
                    className="text-red-600 font-black uppercase text-xs tracking-widest border-b-2 border-red-100 pb-1"
                  >
                    Submit another report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-500/20 transition-all outline-none font-medium text-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-500/20 transition-all outline-none font-medium text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">
                      Issue Category
                    </label>
                    <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-red-500/20 transition-all outline-none font-bold text-gray-600 appearance-none">
                      <option>Technical Bug</option>
                      <option>Account Access</option>
                      <option>Safety or Harassment</option>
                      <option>Donation Process Issue</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">
                      Description
                    </label>
                    <textarea
                      required
                      rows="5"
                      placeholder="Tell us exactly what happened..."
                      className="w-full bg-gray-50 border-none rounded-[2rem] px-6 py-5 focus:ring-2 focus:ring-red-500/20 transition-all outline-none font-medium text-gray-700 resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={ticketStatus === 'sending'}
                    className="w-full md:w-auto bg-gray-900 hover:bg-red-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl disabled:opacity-50"
                  >
                    {ticketStatus === 'sending'
                      ? 'Sending Report...'
                      : 'Submit Report'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Side: Help Cards */}
          <aside className="lg:w-1/3 space-y-6">
            <div className="bg-red-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <Clock className="mb-4 opacity-80" size={32} />
                <h4 className="text-xl font-black mb-2 italic">
                  Urgent Support
                </h4>
                <p className="text-red-100 text-sm font-medium mb-6 leading-relaxed">
                  Is this a critical health or safety emergency related to a
                  donation? Don't wait for a ticket.
                </p>
                <button
                  onClick={() => (window.location.href = 'tel:01609216725')}
                  className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg active:scale-95 group"
                >
                  <Phone
                    size={14}
                    className="fill-red-600 group-hover:animate-shake"
                  />
                  <span>Call Hotline Now</span>
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <HelpCircle size={16} /> Quick Resources
              </h4>
              <div className="space-y-4">
                {[
                  { t: 'Forgot Password', i: <ArrowRight size={14} /> },
                  { t: 'Account Security', i: <ArrowRight size={14} /> },
                  { t: 'Terms of Service', i: <ArrowRight size={14} /> },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-gray-600 group-hover:text-red-600">
                      {item.t}
                    </span>
                    <span className="text-gray-300 group-hover:text-red-600 transition-all">
                      {item.i}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ReportAnIssue;
