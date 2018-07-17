import React from 'react';
import PropTypes from 'prop-types';

const SideImage = ({ id }) => (
  <section className="col-3-4 hero text-center bg-dark" id={id}>
    <div>
      <img
        src="http://res.cloudinary.com/dikaeinstein/image/upload/c_scale,q_auto:low,w_1077/v1525566660/book-a-meal/close-up-cooking-dinner-46239.jpg"
        alt="meal"
      />
    </div>
  </section>
);

SideImage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SideImage;
