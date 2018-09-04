import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuMeal from './MenuMeal';
import { getMenu } from '../../reducers/menuReducer';


export const MealList = ({ meals, link }) => {
  const mealList = meals
    .map(meal => <MenuMeal key={meal.id} defaultMeal={meal} link={link} />);

  return (
    <section className="card user-menu text-left">
      {mealList}
    </section>
  );
};

MealList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  meals: getMenu(state.menu).meals,
});

export default connect(mapStateToProps)(MealList);
