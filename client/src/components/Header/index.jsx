import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Navigation from './Navigation';

const Header = ({ className }) => (
  <header className={className}>
    <Logo
      text="Book-A-meal"
      className="col-1-4 logo text-left"
    />
    <div className="toggle-show">&#9776;</div>
    <Navigation />
  </header>
);

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Header;
