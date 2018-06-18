import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meal from './Meal';

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

ConnectedCatererMealList.propType = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals.data,
});

const CatererMealList = connect(mapStateToProps)(ConnectedCatererMealList);

export default CatererMealList;
