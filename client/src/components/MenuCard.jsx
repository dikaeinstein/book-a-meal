import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMenu } from '../actions/menuActions';
import MealList from './MealList';

class ConnectedMenuCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMenu();
  }

  render() {
    if (this.props.isFetching) {
      return <div>Loading...</div>;
    }
    if (this.props.error) {
      return <div>{this.props.error.message}</div>;
    }
    return (
      <section className="bg-light landing-main" id="menu">
        <h2 className="text-center amount">
          Menu for {(new Date()).getFullYear()}
        </h2>
        <MealList />
      </section>
    );
  }
}

ConnectedMenuCard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  fetchMenu: PropTypes.func.isRequired,
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
