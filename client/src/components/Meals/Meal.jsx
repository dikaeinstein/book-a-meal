import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../util/Button';
import { deleteMeal } from '../../actions/mealActions';

const ConnectedMeal = ({ meal, ...rest }) => {
  const { isDeleting, isUpdating, removeMeal } = rest;
  const btnStyle = {
    display: 'inline-block',
    margin: '.5rem',
  };
  const handleDelete = () => {
    removeMeal(meal.id);
  };
  const handleUpdate = () => {
    rest.handleMealUpdate(meal);
  };
  return (
    <div className="card user-menu-item">
      <img
        src={meal.imageUrl}
        alt="meal.name"
      />
      <p className="amount">
        {meal.name}
      </p>
      <p className="amount">&#x20a6;{meal.price}</p>
      <div style={{ width: '71%', margin: '0 auto' }}>
        <Button
          className="btn btn-success btn-alt"
          value="Edit"
          style={btnStyle}
          disabled={isUpdating}
          onClick={handleUpdate}
        />
        <Button
          className="btn btn-danger btn-alt"
          value="Delete"
          style={btnStyle}
          onClick={handleDelete}
          disabled={isDeleting}
        />
      </div>
    </div>
  );
};

ConnectedMeal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

const mapStateToProps = state => ({
  isDeleting: state.meals.isDeleting,
  isUpdating: state.meals.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  removeMeal: id => dispatch(deleteMeal(id)),
});

const Meal = connect(mapStateToProps, mapDispatchToProps)(ConnectedMeal);

export default Meal;
