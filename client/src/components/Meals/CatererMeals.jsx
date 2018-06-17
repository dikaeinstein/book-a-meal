import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import { fetchMeals } from '../../actions/mealActions';
import CatererMealList from './CatererMealList';
import Loading from '../util/Loading';

class ConnectedCatererMeals extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  render() {
    const { isFetching, error, handleMealUpdate } = this.props;
    if (isFetching) {
      return (
        <div className="loader-container">
          <Loading text="Loading...">
            <Preloader flashing size="big" />
          </Loading>
        </div>
      );
    }
    if (error) {
      return (
        <h1 className="error-container text-center">
          {error} :)
        </h1>
      );
    }
    return (
      <section className="bg-light landing-main" id="menu">
        <h1 className="text-center text-dark">
          Meals
        </h1>
        <CatererMealList handleMealUpdate={handleMealUpdate} />
      </section>
    );
  }
}

ConnectedCatererMeals.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  fetchMeals: PropTypes.func.isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
  error: state.meals.fetchError,
});

const mapDispatchToProps = dispatch => ({
  fetchMeals: () => dispatch(fetchMeals()),
});

const CatererMeals = connect(mapStateToProps, mapDispatchToProps)(ConnectedCatererMeals);

export default CatererMeals;
