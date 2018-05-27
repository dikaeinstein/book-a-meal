import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ text, className }) => (
  <h1 className={className}>{text}</h1>
);

Logo.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Logo;
