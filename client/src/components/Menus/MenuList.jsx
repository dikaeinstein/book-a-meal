import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealActions';

class ConnectedMenuList extends Component {

  renderMenuMealList() {
    return this.props.meals.map(meal => (
      <li>{meal.name}</li>
    ));
  }

  render() {
    const { isFetching, menus } = this.props;
    const menuList = menus.map(menu => (
      <div>
        <p>{menu.name}</p>
        <ul>
          {this.renderMenuMealList()}
        </ul>
      </div>
    ));

    return (
      <div>{menuList}</div>
    );
  }
}

ConnectedMenuList.propTypes = {
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
  error: state.menus.fetchError,
});

const mapDispatchToProps = dispatch => ({
  fetchMenus: () => dispatch(fetchMenus()),
});

const MenuList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedMenuList);

export default MenuList;
