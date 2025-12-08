import React from 'react';
import { FaUserPlus, FaSearchLocation, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Easy Registration',
    description:
      'Join as a blood donor in just a few steps and start saving lives today.',
    icon: <FaUserPlus className="w-14 h-14 text-red-700 mb-4 animate-bounce" />,
  },
  {
    title: 'Find Donors Nearby',
    description:
      'Search for blood donors in your area instantly with our location-based system.',
    icon: (
      <FaSearchLocation className="w-14 h-14 text-red-700 mb-4 animate-bounce" />
    ),
  },
  {
    title: 'Safe & Secure',
    description:
      'All your personal information is protected and our platform is fully trustworthy.',
    icon: (
      <FaShieldAlt className="w-14 h-14 text-red-700 mb-4 animate-bounce" />
    ),
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-base-100 relative overflow-hidden">
      {/* subtle animated red circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-red-700/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-red-700/10 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse"></div>

      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Why Choose RedDrop?
        </h2>
        <p className="text-gray-700 dark:text-gray-500 max-w-2xl mx-auto">
          Our platform makes blood donation simple, safe, and accessible for
          everyone. Check out the main features below!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-red-50 dark:bg-red-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-200">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
