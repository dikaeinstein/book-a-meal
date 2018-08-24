import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Loading from '../util/Loading';
import { getMenu } from '../../reducers/menuReducer';

class ConnectedMenu extends Component {
  renderMealList() {
    return this.props.menu.meals.map(meal => (
      <tr key={String(meal.id)}>
        <td>{meal.name}</td>
        <td>&#x20a6; {meal.price}</td>
      </tr>
    ));
  }

  render() {
    const { isFetching } = this.props;

    return (
      isFetching
        ?
          <Loading text="Fetching menu . . .">
            <Preloader />
          </Loading>
        :
          <section className="menu landing-main">
            <h2 className="text-center">
              Menu for Today {(new Date()).toDateString()}
            </h2>
            <div className="card menu-card table-scroll">
              <table className="font-weight-bold">
                <tbody>
                  {this.renderMealList()}
                </tbody>
              </table>
            </div>
          </section>
    );
  }
}

ConnectedMenu.propTypes = {
  menu: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.number,
  ])).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  menu: getMenu(state.menu),
  isFetching: state.menu.isFetching,
});

const Menu = connect(mapStateToProps)(ConnectedMenu);

export default Menu;
