import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import { fetchMenu } from '../actions/menuActions';
import MealList from './MealList';

class ConnectedMenuCard extends Component {
  componentDidMount() {
    this.props.fetchMenu();
  }

  render() {
    const { isFetching, error, link } = this.props;
    if (isFetching) {
      return <CircleLoader loading={isFetching} />;
    }
    if (error) {
      return (
        <h1 className="error-container text-center">
          {error} ):
        </h1>
      );
    }
    return (
      <section className="bg-light landing-main" id="menu">
        <h2 className="text-center amount">
          Menu for Today {(new Date()).toDateString()}
        </h2>
        <MealList link={link} />
      </section>
    );
  }
}

ConnectedMenuCard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  fetchMenu: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.menu.isFetching,
  error: state.menu.error,
});

const mapDispatchToProps = dispatch => ({
  fetchMenu: () => dispatch(fetchMenu()),
});

const MenuCard = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenuCard);

export default MenuCard;
