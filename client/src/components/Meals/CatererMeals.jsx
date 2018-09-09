import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import CatererMealList from './CatererMealLIst';
import Loading from '../util/Loading';
import { getMeals } from '../../reducers/mealReducer';

export const CatererMeals = ({ isFetching, handleMealUpdate, meals }) => {
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
      <h4 className="text-center">Meals</h4>
      <CatererMealList
        meals={meals}
        handleMealUpdate={handleMealUpdate}
      />
    </section>
  );
};

CatererMeals.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
  meals: getMeals(state.meals),
});

export default connect(mapStateToProps)(CatererMeals);
