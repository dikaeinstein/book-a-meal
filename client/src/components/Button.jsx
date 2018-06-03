import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ value, ...otherProps }) => (
  <button {...otherProps}>
    {value}
  </button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
