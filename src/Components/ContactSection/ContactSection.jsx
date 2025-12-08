import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="relative py-24 px-6 md:px-20 overflow-hidden bg-base-100">
      {/* Red glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/30 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-700/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-wide">
          Get in Touch
        </h2>
        <p className="text-base-content/80 mt-3 max-w-2xl mx-auto text-lg">
          Need any help or want to contact us? We’re always here to support you.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <div className="backdrop-blur-lg bg-base-100/70 border border-primary/10 rounded-2xl shadow-xl p-6 md:p-10">
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="
      w-full
      px-4 py-3
      rounded-xl
      bg-red-50 dark:bg-red-900/10
      border border-gray-300 dark:border-red-800/50
      text-gray-900 dark:text-gray-700
      focus:outline-none focus:border-red-500 
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="
      w-full
      px-4 py-3
      rounded-xl
      bg-red-50 dark:bg-red-900/10
      border border-gray-300 dark:border-red-800/50
      text-gray-900 dark:text-gray-700
      focus:outline-none focus:border-red-500 
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400 font-medium">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="
      w-full
      px-4 py-3
      rounded-xl
      bg-red-50 dark:bg-red-900/10
      border border-gray-300 dark:border-red-800/50
      text-gray-900 dark:text-gray-700
      focus:outline-none focus:border-red-500 
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              className="
      btn w-full bg-primary text-primary-content text-lg 
      hover:bg-red-600 transition-all duration-300
    "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="space-y-8">
          <div className="flex items-center space-x-5 p-6 rounded-xl bg-base-100 border border-primary/10 shadow hover:shadow-xl transition">
            <FaPhoneAlt className="text-primary text-3xl" />
            <div>
              <h4 className="text-xl font-semibold text-base-content">Phone</h4>
              <p className="text-base-content/70">+880 1700 000 000</p>
            </div>
          </div>

          <div className="flex items-center space-x-5 p-6 rounded-xl bg-base-100 border border-primary/10 shadow hover:shadow-xl transition">
            <FaEnvelope className="text-primary text-3xl" />
            <div>
              <h4 className="text-xl font-semibold text-base-content">Email</h4>
              <p className="text-base-content/70">support@reddrop.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-5 p-6 rounded-xl bg-base-100 border border-primary/10 shadow hover:shadow-xl transition">
            <FaMapMarkerAlt className="text-primary text-3xl" />
            <div>
              <h4 className="text-xl font-semibold text-base-content">
                Location
              </h4>
              <p className="text-base-content/70">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
