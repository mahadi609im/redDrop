import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Stethoscope,
  Activity,
  Coffee,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router';

const DonationProcess = () => {
  const processSteps = [
    {
      id: '01',
      icon: <ClipboardCheck size={24} />,
      title: 'Preparation & Registration',
      desc: 'Your journey starts with a simple check-in process to verify your identity and eligibility.',
      details: [
        'Present a valid government-issued ID card.',
        'Read the educational materials provided.',
        'Complete a private health history questionnaire.',
        'Initial eligibility screening by our coordinators.',
      ],
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      id: '02',
      icon: <Stethoscope size={24} />,
      title: 'Health Screening',
      desc: "A brief 'mini-physical' to ensure that giving blood is safe for you on this particular day.",
      details: [
        'Pulse and Blood Pressure measurement.',
        'Body temperature check.',
        'Hemoglobin (iron level) test via a small finger prick.',
        'Confidential interview about your travel history.',
      ],
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      id: '03',
      icon: <Activity size={24} />,
      title: 'The Donation Process',
      desc: 'This is where the magic happens. A standard whole blood donation takes about 8-10 minutes.',
      details: [
        'Comfortable seating in a specialized donor chair.',
        'Cleansing of the arm area with an antiseptic.',
        'Use of a brand-new, sterile, single-use needle.',
        'Collection of approximately one pint of blood.',
      ],
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      id: '04',
      icon: <Coffee size={24} />,
      title: 'Recovery & Refreshments',
      desc: 'Post-donation care is vital. We ensure you feel great before you head back to your day.',
      details: [
        'Rest for 10-15 minutes in our observation area.',
        'Enjoy high-energy snacks and fluids.',
        "Receive a 'Hero' sticker and donation certificate.",
        'Instructions on post-donation arm care.',
      ],
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-32">
      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-64 px-6 bg-base-200 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[linear-linear(to_right,#80808008_1px,transparent_1px),linear-linear(to_bottom,#80808008_1px,transparent_1px)] bg-size[24px_24px]"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            <CheckCircle2 size={16} />
            <span>Donation Proccess</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tight"
          >
            The Donation <span className="text-primary">Lifecycle.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            From the moment you walk in to the final refreshment, every step is
            designed for your comfort and safety. Here is what to expect.
          </motion.p>
        </div>
      </header>

      {/* --- VERTICAL TIMELINE PROCESS --- */}
      <main className="max-w-5xl mx-auto px-6 -mt-40 relative z-20">
        <div className="space-y-12">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Step Number Badge */}
              <div className="hidden md:flex flex-col items-center pt-2">
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center font-black text-xl shadow-sm border border-white`}
                >
                  {step.id}
                </div>
                {idx !== processSteps.length - 1 && (
                  <div className="w-px h-32 bg-linear-to-b from-gray-200 to-transparent mt-4" />
                )}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-base-100 rounded-[2.5rem] border border-base-300 p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-base-300/40 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`md:hidden w-10 h-10 rounded-xl ${step.bg} ${step.color} flex items-center justify-center font-black`}
                  >
                    {step.id}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight italic">
                    {step.title}
                  </h2>
                </div>

                <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                  {step.desc}
                </p>

                {/* Detail List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {step.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-base-200/50 rounded-2xl border border-base-300 transition-colors hover:bg-base-100 hover:border-primary/20 group"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-red-500 mt-0.5 shrink-0 transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PRO-TIP / WARNING SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-8 md:p-12 rounded-[3rem] bg-linear-to-br from-red-500 to-red-700 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="w-20 h-20 bg-base-100/20 backdrop-blur-xl rounded-full flex items-center justify-center shrink-0">
              <Info size={40} className="text-primary-content" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2 italic">
                Pro-Tip for Donors
              </h3>
              <p className="text-red-50 opacity-90 font-medium leading-relaxed">
                Make sure to drink plenty of water (at least 500ml) and have a
                healthy, low-fat meal 2-3 hours before your appointment. This
                significantly reduces the chance of feeling lightheaded after
                donation.
              </p>
            </div>
          </div>
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-base-100/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        </motion.div>
      </main>

      {/* --- FOOTER CTA --- */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <h2 className="text-3xl font-black text-base-content mb-6">
          Still have questions?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/health-tips"
            className="px-8 py-4 bg-base-content text-base-100 rounded-2xl font-bold text-sm tracking-widest hover:bg-primary transition-all shadow-lg"
          >
            VIEW ELIGIBILITY
          </Link>
          <Link
            to="/help-center"
            className="px-8 py-4 bg-base-100 text-base-content border border-base-300 rounded-2xl font-bold text-sm tracking-widest hover:border-primary transition-all shadow-sm"
          >
            FAQ SECTION
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DonationProcess;
