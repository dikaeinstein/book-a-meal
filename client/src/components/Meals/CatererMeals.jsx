import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import CatererMealList from './CatererMealLIst';
import Loading from '../util/Loading';
import { getMeals } from '../../reducers/mealReducer';

const ConnectedCatererMeals = ({ isFetching, handleMealUpdate, meals }) => {
  if (isFetching) {
    return (
      <div className="loader-container">
        <Loading text="fetching meals...">
          <Preloader flashing size="medium" />
        </Loading>
      </div>
    );
  }

  return (
    <section className="bg-light">
      <h1 className="text-center">Meals</h1>
      <CatererMealList
        meals={meals}
        handleMealUpdate={handleMealUpdate}
      />
    </section>
  );
};

ConnectedCatererMeals.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
  meals: getMeals(state.meals),
});

const CatererMeals = connect(mapStateToProps)(ConnectedCatererMeals);

export default CatererMeals;
