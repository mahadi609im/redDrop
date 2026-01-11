import React, { useContext, useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Users, Heart, Banknote, ShieldCheck } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.on('change', latest => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

const StatsSection = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalDonors: 0,
    fundsRaised: 0,
    livesSaved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, fundsRes] = await Promise.all([
          axiosSecure.get('/donors'),
          axiosSecure.get('/funds/total'),
        ]);

        setStats({
          totalDonors: usersRes.data.length || 0,
          fundsRaised: fundsRes.data.totalAmount || 0,
          livesSaved: usersRes.data.length * 3 + 120,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  const statItems = [
    {
      label: 'Happy Donors',
      value: stats.totalDonors,
      icon: <Users className="w-7 h-7" />,
      suffix: '+',
      accentColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Lives Saved',
      value: stats.livesSaved,
      icon: <Heart className="w-7 h-7" />,
      suffix: '+',
      accentColor: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Funds Raised',
      value: stats.fundsRaised,
      icon: <Banknote className="w-7 h-7" />,
      suffix: ' $',
      accentColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Verified Badges',
      value: 850,
      icon: <ShieldCheck className="w-7 h-7" />,
      suffix: '+',
      accentColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <section className="py-24 bg-base-100 transition-colors duration-500 overflow-hidden relative">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="conCls relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live Impact Tracker
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-[1.1] text-base-content tracking-tighter">
              Numbers that <br />
              <span className="text-primary italic">Fuel Hope</span>
            </h2>

            <p className="text-base-content/60 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium italic">
              "RedDrop is more than just a platform; it's a heartbeat. Every
              donor registered is a second chance given to someone in need."
            </p>

            <div className="pt-4">
              <Link
                to={user ? '/blood-requests' : '/registration'}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-content font-black italic uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-primary/90 hover:shadow-lg active:scale-95"
              >
                <span className="text-sm">
                  {user ? 'View Requests' : 'Join Now'}
                </span>

                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {statItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-base-200/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-base-300 shadow-xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div
                  className={`${item.bgColor} ${item.accentColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {item.icon}
                </div>

                <div className="text-4xl font-black text-base-content mb-1 flex items-baseline tracking-tighter">
                  <Counter value={item.value} />
                  <span className="text-primary ml-1 text-2xl font-black">
                    {item.suffix}
                  </span>
                </div>

                <p className="text-base-content/40 font-black text-[10px] uppercase tracking-[0.2em]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
