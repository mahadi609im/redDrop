import React from 'react';
import logo from '../../assets/blood-logo.png';

const Footer = () => {
  return (
    <footer className="relative bg-[#110c0f] text-gray-300 py-14 px-6 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0">
        <div className="w-72 h-72 bg-red-600/20 rounded-full blur-[130px] absolute -top-20 -left-10"></div>
        <div className="w-72 h-72 bg-pink-600/20 rounded-full blur-[130px] absolute bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        {/* Brand */}
        <div>
          <div className="flex items-center">
            <img
              src={logo}
              alt="redDrop Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-2xl font-bold text-white tracking-wide">
              red<span className="text-red-500">Drop</span>
            </h2>
          </div>

          <p className="mt-3 text-gray-400 leading-relaxed">
            Saving lives with every drop — a trusted platform for blood donors
            and recipients.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              Home
            </li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              About Us
            </li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              Donate Blood
            </li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              Find Donor
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">
              Safety Guidelines
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-gray-400">Phone: +880 1730-XXXXXX</p>
          <p className="text-gray-400 mt-1">Email: support@reddrop.org</p>

          <div className="flex items-center space-x-4 mt-4">
            <a className="hover:text-red-500 transition-colors cursor-pointer">
              Facebook
            </a>
            <a className="hover:text-red-500 transition-colors cursor-pointer">
              Instagram
            </a>
            <a className="hover:text-red-500 transition-colors cursor-pointer">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} redDrop — Together We Save Lives.
      </div>
    </footer>
  );
};

export default Footer;
