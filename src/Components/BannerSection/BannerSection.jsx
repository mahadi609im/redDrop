import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const BannerSection = () => {
  const navigate = useNavigate();

  // Scroll function to next section
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth',
    });
  };

  // Animations variants
  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  const floating = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative w-full md:h-[70vh] md:min-h-[500px] overflow-hidden bg-linear-to-br from-red-700 via-red-600 to-red-800 text-white flex items-center py-10">
      <div className="conCls">
        {/* Background Animated Bubbles */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-[-50px] right-10 w-80 h-80 bg-red-900/60 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Text Section with Framer Motion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-2xl">
              Your Blood Can Save <br />
              <span className="text-red-200 italic">Someone’s Life</span> Today
            </h1>

            <p className="text-base md:text-lg opacity-90 max-w-lg">
              Help people in need by becoming a donor. A small act of kindness
              can mean everything to someone in crisis.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 rounded-xl bg-white text-red-700 font-bold shadow-xl hover:bg-red-50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Join as a Donor
              </button>

              <button
                onClick={() => navigate('/donors')}
                className="px-8 py-4 rounded-xl bg-red-950/40 backdrop-blur-md border border-white/20 text-white font-bold shadow-lg hover:bg-red-900/60 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Donors
              </button>
            </div>
          </motion.div>

          {/* Image Section with Floating Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="flex-1 flex justify-center md:justify-end"
          >
            <motion.div
              variants={floating}
              animate="animate"
              className="relative w-full max-w-[280px] md:max-w-sm drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <img
                src="https://i.ibb.co.com/pvXHfvLv/pngwing-com.png"
                alt="Blood Donation"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator (ইঙ্গিত) */}
        <div className="absolute bottom-8 right-0 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 italic">
            Scroll
          </span>
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full border border-base-300 flex items-center justify-center text-primary bg-base-100/50 backdrop-blur-md hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <FaArrowDown />
          </motion.button>
        </div>

        {/* Decorative Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-10 fill-base-100"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
