import React from 'react';
import IntroBanner from './IntroBanner';
import MenuCard from '../MenuCard';
import Footer from '../Footer';

const HomePage = () => (
  <div>
    <IntroBanner />
    <MenuCard link="/signin" />
    <Footer />
  </div>
);

export default HomePage;
