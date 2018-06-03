import React from 'react';
import { hot } from 'react-hot-loader';
import Header from './Header';
import IntroBanner from './IntroBanner';
import MenuCard from './MenuCard';
import Footer from './Footer';

const App = () => (
  <div>
    <Header className="navbar" />
    <IntroBanner />
    <MenuCard />
    <Footer />
  </div>
);

export default hot(module)(App);
