import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';

const HealthTips = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('before');

  // Quick Eligibility Logic State
  const [checker, setChecker] = useState({
    age: '',
    weight: '',
    health: 'yes',
  });

  // Real-time Validation
  const eligibility = useMemo(() => {
    if (!checker.age || !checker.weight)
      return { status: 'neutral', msg: 'Pending Input' };
    const ageNum = parseInt(checker.age);
    const weightNum = parseInt(checker.weight);

    if (
      ageNum >= 18 &&
      ageNum <= 65 &&
      weightNum >= 50 &&
      checker.health === 'yes'
    ) {
      return { status: 'valid', msg: 'Eligible to Donate ✅' };
    }
    return { status: 'invalid', msg: 'Not Eligible ❌' };
  }, [checker]);

  const categories = {
    before: [
      {
        id: 1,
        title: 'Iron Rich Diet',
        icon: '🍎',
        desc: 'Focus on spinach, red meat, and fortified cereals 48h before to boost hemoglobin.',
        color: 'from-red-500/10 to-orange-500/10',
        border: 'border-red-200 dark:border-red-800/30',
      },
      {
        id: 2,
        title: 'Hydration',
        icon: '💧',
        desc: 'Drink an extra 500ml of water or juice just before your appointment.',
        color: 'from-blue-500/10 to-cyan-500/10',
        border: 'border-blue-200 dark:border-blue-800/30',
      },
      {
        id: 3,
        title: 'Sleep Cycle',
        icon: '😴',
        desc: 'Ensure at least 7-9 hours of deep sleep to avoid dizziness or fatigue.',
        color: 'from-purple-500/10 to-indigo-500/10',
        border: 'border-purple-200 dark:border-purple-800/30',
      },
    ],
    during: [
      {
        id: 1,
        title: 'Relaxation',
        icon: '🧘‍♂️',
        desc: 'Take deep breaths or listen to calm music during the 8-10 min process.',
        color: 'from-emerald-500/10 to-teal-500/10',
        border: 'border-emerald-200 dark:border-emerald-800/30',
      },
      {
        id: 2,
        title: 'Comfortable Clothes',
        icon: '👕',
        desc: 'Wear loose clothing with sleeves that can easily be rolled up.',
        color: 'from-gray-500/10 to-slate-500/10',
        border: 'border-gray-200 dark:border-gray-800/30',
      },
      {
        id: 3,
        title: 'Stay Alert',
        icon: '📢',
        desc: 'Inform the medical staff immediately if you feel any tingling or nausea.',
        color: 'from-amber-500/10 to-yellow-500/10',
        border: 'border-amber-200 dark:border-amber-800/30',
      },
    ],
    after: [
      {
        id: 1,
        title: 'Liquid Intake',
        icon: '🥤',
        desc: 'Keep drinking extra fluids for the next 24-48 hours to stay balanced.',
        color: 'from-sky-500/10 to-blue-500/10',
        border: 'border-sky-200 dark:border-sky-800/30',
      },
      {
        id: 2,
        title: 'No Heavy Lifting',
        icon: '🚫',
        desc: 'Avoid the gym or carrying heavy loads for the next 5-10 hours.',
        color: 'from-rose-500/10 to-red-500/10',
        border: 'border-rose-200 dark:border-rose-800/30',
      },
      {
        id: 3,
        title: 'Savory Snack',
        icon: '🍫',
        desc: 'Have juice and biscuits immediately after to stabilize your blood sugar.',
        color: 'from-orange-500/10 to-amber-500/10',
        border: 'border-orange-200 dark:border-orange-800/30',
      },
    ],
  };

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-20 relative overflow-hidden bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#120909]">
      {/* Background Glows */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-red-500/20 rounded-full blur-[80px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-56 h-56 bg-red-700/10 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 animate-fadeIn">
        <div className="inline-block mb-4 px-5 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full border border-red-200 dark:border-red-800/50">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wide uppercase">
            ❤️ Donor Wellness Guide
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 bg-linear-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent leading-tight">
          Health Tips for Donors
        </h1>
      </div>

      {/* Quick Eligibility Checker with Dynamic Link */}
      <div className="max-w-4xl mx-auto mb-16 relative z-10">
        <div
          className={`p-6 rounded-3xl bg-white/40 dark:bg-black/20 backdrop-blur-md border transition-all duration-500 ${
            eligibility.status === 'valid'
              ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
              : eligibility.status === 'invalid'
              ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
              : 'border-gray-200 dark:border-red-900/30'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold dark:text-white uppercase tracking-tight">
                  Quick Check
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Verify eligibility in seconds
                </p>
              </div>
            </div>

            <div className="flex flex-wrap flex-1 gap-4 items-center">
              <input
                type="number"
                placeholder="Age"
                className="flex-1 min-w-[100px] bg-white dark:bg-black/40 border border-gray-200 dark:border-red-900/30 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 ring-red-500/50 dark:text-white transition-all"
                onChange={e => setChecker({ ...checker, age: e.target.value })}
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                className="flex-1 min-w-[100px] bg-white dark:bg-black/40 border border-gray-200 dark:border-red-900/30 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 ring-red-500/50 dark:text-white transition-all"
                onChange={e =>
                  setChecker({ ...checker, weight: e.target.value })
                }
              />

              {/* Dynamic Status Display or Donation Link */}
              {eligibility.status === 'valid' ? (
                <button
                  onClick={() => navigate('/blood-requests')}
                  className="px-6 py-2.5 rounded-xl text-xs font-black uppercase bg-green-500 text-white hover:bg-green-600 transition-all shadow-lg animate-bounce duration-1000"
                >
                  Donate Now →
                </button>
              ) : (
                <div
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase min-w-[150px] flex items-center justify-center transition-all duration-300 ${
                    eligibility.status === 'invalid'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-red-900/20 text-gray-400'
                  }`}
                >
                  {eligibility.msg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="inline-flex p-1 bg-gray-100 dark:bg-red-950/20 rounded-2xl border border-gray-200 dark:border-red-900/30 shadow-inner">
          {['before', 'during', 'after'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 capitalize ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'text-gray-500 hover:text-red-500 dark:text-gray-400'
              }`}
            >
              {tab} Donation
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative z-10">
        {categories[activeTab].map(item => (
          <div
            key={item.id}
            className={`group p-8 rounded-2xl bg-white/80 dark:bg-[#1a1a1a]/60 backdrop-blur-xl border-b-4 ${item.border} shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
          >
            <div
              className={`w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center text-4xl shadow-inner border border-white/10`}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-red-600 transition-colors">
              {item.id}. {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-20 max-w-4xl mx-auto bg-linear-to-r from-red-600 to-red-500 rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl shadow-red-500/20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Save a Life?
        </h2>
        <p className="text-red-100 mb-8 max-w-xl mx-auto font-medium">
          Your single donation can save up to three lives. Join our community of
          lifesavers today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/blood-requests')}
            className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all shadow-lg uppercase text-xs tracking-wider"
          >
            View Requests
          </button>
          <button
            onClick={() => navigate('/dashboard/create-donation-request')}
            className="px-8 py-3 bg-red-800/30 text-white border border-red-400/50 font-bold rounded-xl hover:bg-red-800/40 transition-all backdrop-blur-md uppercase text-xs tracking-wider"
          >
            Create Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
