import React from 'react';
import PropTypes from 'prop-types';
import ConnectedMeal from './Meal';

const CatererMealList = ({ meals, handleMealUpdate }) => {
  const mealList = meals.map(meal => (
    <ConnectedMeal
      key={meal.id}
      meal={meal}
      handleMealUpdate={handleMealUpdate}
    />
  ));

  return (
    <section className="card user-menu text-left">
      {mealList}
    </section>
  );
};

CatererMealList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
};

export default CatererMealList;
