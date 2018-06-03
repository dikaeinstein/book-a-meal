import React from 'react';
import PropTypes from 'prop-types';

const SideImage = ({ id }) => (
  <section className="col-3-4 hero text-center" id={id}>
    <div>
      <img
        src="http://res.cloudinary.com/dikaeinstein/image/upload/c_scale,q_auto:eco,w_1029/v1525566673/book-a-meal/avocado-cooked-delicious-262959.jpg"
        alt="meal"
      />
    </div>
  </section>
);

SideImage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SideImage;
