import React from 'react';
import BannerSection from '../../Components/BannerSection/BannerSection';
import FeaturedSection from '../../Components/FeaturedSection/FeaturedSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <section>
        <BannerSection></BannerSection>
      </section>
      <section>
        <FeaturedSection></FeaturedSection>
      </section>
      <section>
        <ContactSection></ContactSection>
      </section>
    </div>
  );
};

export default Home;
