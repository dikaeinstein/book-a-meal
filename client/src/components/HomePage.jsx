import React from 'react';
import IntroBanner from './IntroBanner';
import MenuCard from './MenuCard';

const HomePage = () => (
  <div>
    <IntroBanner />
    <MenuCard link="/signin" />
  </div>
);

export default HomePage;
