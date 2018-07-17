import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Loading from '../util/Loading';
import { fetchMenu } from '../../actions/menuActions';

class ConnectedMenu extends Component {
  componentDidMount() {
    this.props.fetchMenu();
  }

  render() {
    const { menu, isFetching } = this.props;

    const mealList = menu.meals.map(meal => (
      <tr key={String(meal.id)}>
        <td>{meal.name}</td>
        <td>&#x20a6; {meal.price}</td>
      </tr>
    ));

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
                  {mealList}
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
  fetchMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menus.data.menu,
  isFetching: state.menus.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchMenu: () => dispatch(fetchMenu()),
});

const Menu = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu);

export default Menu;
