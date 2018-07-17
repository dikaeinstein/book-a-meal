import React from 'react';

const Footer = () => (
  <footer className="text-center">
    <p>
      &copy; Book-A-Meal
      {' '}
      {new Date().getFullYear()}.
      Developed with <span className="text-dark">&#10084;</span> by
      {' '}
      <a href="https://dikaeinstein.github.io">Dikaeinstein</a>
    </p>
  </footer>
);

export default Footer;
