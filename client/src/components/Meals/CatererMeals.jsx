import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import { fetchMeals } from '../../actions/mealActions';
import CatererMealList from './CatererMealLIst';
import Loading from '../util/Loading';

class ConnectedCatererMeals extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  render() {
    const { isFetching, handleMealUpdate } = this.props;
    if (isFetching) {
      return (
        <div className="loader-container">
          <Loading text="Loading...">
            <Preloader flashing size="big" />
          </Loading>
        </div>
      );
    }

    return (
      <section className="bg-light landing-main">
        <h1 className="text-center">
          Meals
        </h1>
        <CatererMealList handleMealUpdate={handleMealUpdate} />
      </section>
    );
  }
}

ConnectedCatererMeals.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchMeals: () => dispatch(fetchMeals()),
});

const CatererMeals = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedCatererMeals);

export default CatererMeals;
