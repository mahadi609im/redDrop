import React from 'react';
import { useNavigate } from 'react-router';

const BannerSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-red-700 via-red-600 to-red-800 text-white py-20 px-6 md:px-16">
      {/* Soft Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-red-900/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center gap-12 flex-col-reverse md:flex-row">
        {/* Text Section  */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Your Blood Can Save <br /> Someone’s Life Today
          </h1>

          <p className="text-lg opacity-90">
            Help people in need by becoming a donor or find the nearest donors
            quickly. A small act of kindness can mean everything.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <button
              onClick={() => navigate('/register')}
              className="
            px-8 py-4 rounded-xl bg-white text-red-700 font-bold 
            shadow-lg hover:shadow-red-400/40 hover:scale-105 
            transition-all duration-300
          "
            >
              Join as a Donor
            </button>

            <button
              onClick={() => navigate('/search')}
              className="
            px-8 py-4 rounded-xl bg-red-900 text-white font-bold 
            shadow-lg hover:bg-red-800 hover:scale-105 
            transition-all duration-300
          "
            >
              Search Donors
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="
        w-full max-w-md rounded-3xl overflow-hidden 
        shadow-[0_12px_40px_rgba(255,0,0,0.35)]
        hover:scale-105 transition-all duration-500
      "
        >
          <img
            src="https://i.ibb.co.com/pvXHfvLv/pngwing-com.png"
            alt="Blood Donation"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
