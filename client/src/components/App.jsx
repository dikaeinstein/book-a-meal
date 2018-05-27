import React, { Component } from 'react';
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

export default App;
