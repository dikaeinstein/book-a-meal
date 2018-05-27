import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ConnectedMealList = ({ meals }) => {
  const mealList = meals.map(meal => (
    <div key={meal.id} className="card user-menu-item">
      <a href="signin.html">
        <img
          src={meal.imageUrl}
          alt="Eba with efo riro and cow head"
        />
        <p className="amount">
          {meal.name}
        </p>
        <p className="amount">&#x20a6 {meal.amount}</p>
        <button className="btn btn-default">
          <a href="signin.html">Order Now</a>
        </button>
      </a>
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
};

const mapStateToProps = state => ({
  meals: state.menu.data.meals,
});

const MealList = connect(mapStateToProps)(ConnectedMealList);

export default MealList;
