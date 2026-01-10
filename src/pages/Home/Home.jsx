import React from 'react';
import BannerSection from '../../Components/BannerSection/BannerSection';
import FeaturedSection from '../../Components/FeaturedSection/FeaturedSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import Footer from '../../Components/Footer/Footer';
import RecentRequests from '../../Components/RecentRequests/RecentRequests';
import HowItWorks from '../../Components/HowItWork/HowItWork';
import StatsSection from '../../Components/StatsSection/StatsSection';
import WallOfFame from '../../Components/WallOfFame/WallOfFame';
import BloodChart from '../../Components/BloodChart/BloodChart';
import HealthTipsFAQ from '../../Components/HealthTipsFAQ/HealthTipsFAQ';
import VolunteerCTA from '../../Components/VolunteerCTA/VolunteerCTA';

const Home = () => {
  return (
    <div>
      <section>
        <BannerSection></BannerSection>
      </section>
      <section>
        <RecentRequests></RecentRequests>
      </section>
      <section>
        <HowItWorks></HowItWorks>
      </section>
      <section>
        <FeaturedSection></FeaturedSection>
      </section>
      <section>
        <StatsSection></StatsSection>
      </section>
      <section>
        <BloodChart></BloodChart>
      </section>
      <section>
        <WallOfFame></WallOfFame>
      </section>
      <section>
        <HealthTipsFAQ></HealthTipsFAQ>
      </section>
      <section>
        <VolunteerCTA></VolunteerCTA>
      </section>
      <section>
        <ContactSection></ContactSection>
      </section>
    </div>
  );
};

export default Home;
