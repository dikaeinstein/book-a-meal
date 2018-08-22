import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meal from './Meal';
import { getMeals } from '../../reducers/mealReducer';

const ConnectedCatererMealList = ({ meals, handleMealUpdate }) => {
  const mealList = meals.map(meal => (
    <Meal key={meal.id} meal={meal} handleMealUpdate={handleMealUpdate} />
  ));

  return (
    <section className="card user-menu text-left">
      {mealList}
    </section>
  );
};

ConnectedCatererMealList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: getMeals(state.meals),
});

const CatererMealList = connect(mapStateToProps)(ConnectedCatererMealList);

export default CatererMealList;
