import React from 'react';
import PropTypes from 'prop-types';
import Button from '../util/Button';

const Meal = ({ meal }) => (
  <div key={meal.id} className="card user-menu-item">
    <img
      src={meal.imageUrl}
      alt="meal.name"
    />
    <p className="amount">
      {meal.name}
    </p>
    <p className="amount">&#x20a6;{meal.price}</p>
    <span>
      <Button className="btn btn-success" value="Edit" />
    </span>
    <span>
      <Button className="btn btn-danger" value="Delete" />
    </span>
  </div>
);

Meal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Meal;
