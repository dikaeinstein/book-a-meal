import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ConnectedMealList = ({ meals, link }) => {
  const mealList = meals.map(meal => (
    <div key={meal.id} className="card user-menu-item">
      <NavLink to={link}>
        <div>
          <img
            src={meal.imageUrl}
            alt={meal.name}
          />
          <p className="amount">
            {meal.name}
          </p>
          <p className="amount">&#x20a6;{meal.price}</p>
          <button className="btn btn-default">
            <NavLink to={link}>Order Now</NavLink>
          </button>
        </div>
      </NavLink>
    </div>
  ));

  return (
    <section className="card user-menu text-left">
      {mealList}
    </section>
  );
};

ConnectedMealList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  meals: state.menus.data.menu.meals,
});

const MealList = connect(mapStateToProps)(ConnectedMealList);

export default MealList;
