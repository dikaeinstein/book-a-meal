import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import { fetchMenu } from '../../actions/menuActions';
import MealList from './MealList';
import Loading from '../util/Loading';

class ConnectedMenuCard extends Component {
  componentDidMount() {
    this.props.fetchMenu();
  }

  render() {
    const { isFetching, link } = this.props;
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
      <section className="main" id="menu">
        <h2 className="text-center">
          Menu for Today {(new Date()).toDateString()}
        </h2>
        <MealList link={link} />
      </section>
    );
  }
}

ConnectedMenuCard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchMenu: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.menu.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchMenu() { dispatch(fetchMenu()); },
});

const MenuCard = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenuCard);

export default MenuCard;
