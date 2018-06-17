import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealActions';

class ConnectedMenuMeals extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  render() {
    const { isFetching } = this.props;
    return (

    );
  }
}

ConnectedMenuMeals.propTypes = {
  fetchMeals: PropTypes.func.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.meals.isFetching,
  error: state.meals.fetchError,
});

const mapDispatchToProps = dispatch => ({
  fetchMeals: () => dispatch(fetchMeals()),
});

const MenuMeals = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedMenuMeals);

export default MenuMeals;
