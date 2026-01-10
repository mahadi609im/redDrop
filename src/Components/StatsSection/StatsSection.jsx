import React, { useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Heart, Banknote, ShieldCheck } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

// Counter Component remains same for functionality
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Lives Saved',
      value: stats.livesSaved,
      icon: <Heart className="w-7 h-7" />,
      suffix: '+',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Funds Raised',
      value: stats.fundsRaised,
      icon: <Banknote className="w-7 h-7" />,
      suffix: ' $',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Verified Badges',
      value: 850,
      icon: <ShieldCheck className="w-7 h-7" />,
      suffix: '+',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="pb-24 bg-white overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50 rounded-full blur-[120px] opacity-70 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-[120px] opacity-70 -z-10" />

      <div className="conCls  relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest">
              Live Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
              Our Numbers Speak <br />
              <span className="text-red-600 italic">Volumes of Hope</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              RedDrop is more than just a platform; it's a movement. Every donor
              registered and every dollar raised directly impacts a life in
              need.
            </p>
            <div className="pt-4">
              <Link
                to={user ? '/blood-requests' : '/registration'}
                className="px-10 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-200"
              >
                {user ? 'View Requests' : 'Become Part of Us'}
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Stats Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {statItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(220,38,38,0.1)] transition-all duration-500 group"
              >
                <div
                  className={`${item.bgColor} ${item.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  {item.icon}
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2 flex items-baseline">
                  <Counter value={item.value} />
                  <span className="text-red-600 ml-1 text-2xl">
                    {item.suffix}
                  </span>
                </div>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
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
