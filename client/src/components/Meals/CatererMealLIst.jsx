import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meal from './Meal';

const ConnectedCatererMealList = ({ meals }) => {
  const mealList = meals.map(meal => (
    <Meal meal={meal} />
  ));

  return (
    <section className="card user-menu text-left">
      {mealList}
    </section>
  );
};

ConnectedCatererMealList.propType = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals.data,
});

const CatererMealList = connect(mapStateToProps)(ConnectedCatererMealList);

export default CatererMealList;
