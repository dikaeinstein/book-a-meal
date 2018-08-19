import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Logo = ({ text, className }) => (
  <NavLink exact to="/">
    <h1 className={className}>{text}</h1>
  </NavLink>
);

Logo.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Logo;
