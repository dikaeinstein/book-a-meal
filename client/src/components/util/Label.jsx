import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ htmlFor, ...otherProps }) => (
  <label htmlFor={htmlFor} {...otherProps} />
);

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
