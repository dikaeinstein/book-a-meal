import React from 'react';
import Button from '../util/Button';

const IntroBanner = () => (
  <section className="text-center intro-banner image-overlay text-white">
    <h1>Book-A-Meal</h1>
    <p style={{ margin: '1rem' }}>Your favourite meal order service</p>
    <a href="#menu">
      <Button
        value="Book A Meal Now"
        className="btn btn-intro-lg"
      />
    </a>
  </section>
);

export default IntroBanner;
