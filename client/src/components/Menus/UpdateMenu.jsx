import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuCheckBoxForm from './MenuCheckBoxForm';
import { fetchMeals } from '../../actions/mealActions';
import { updateMenu } from '../../actions/menuActions';
import { getMeals } from '../../reducers/mealReducer';
import {
  getCurrentPageUrl,
  getNextPageUrl,
  getPreviousPageUrl,
} from '../../reducers/paginationReducer';
import { getMenu } from '../../reducers/menuReducer';

export class UpdateMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.handlePageChange(this.props.currentUrl);
  }

  async handleSubmit(values) {
    await this.props.modifyMenu(values, this.props.menuId);
    this.props.closeModal();
  }

  handlePageChange(url) {
    this.props.fetchMeals(url);
  }

  render() {
    const { meals, error, isUpdating } = this.props;

    return (
      <section>
        <h5 className="text-center font-weight-bold">Update Menu</h5>
        <MenuCheckBoxForm
          error={error}
          handleSubmit={this.handleSubmit}
          defaultMenuName={this.props.menu.name}
          defaultMenuMealIds={this.props.menu.meals.map(meal => meal.id)}
          meals={meals}
          action="Set"
          isSubmitting={isUpdating}
          nextUrl={this.props.nextUrl}
          currentUrl={this.props.currentUrl}
          previousUrl={this.props.previousUrl}
          onPageChange={this.handlePageChange}
        />
      </section>
    );
  }
}

UpdateMenu.propTypes = {
  modifyMenu: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  menu: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.number,
  ])).isRequired,
  menuId: PropTypes.number.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  closeModal: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
};

const mapStateToProps = state => ({
  error: state.menu.saveError,
  menu: getMenu(state.menu),
  meals: getMeals(state.meals),
  isUpdating: state.menu.isUpdating,
  isFetching: state.meals.isFetching,
  menuId: getMenu(state.menu).id,
  currentUrl: getCurrentPageUrl(state.pagination.meals.superAdmin),
  nextUrl: getNextPageUrl(state.pagination.meals.superAdmin),
  previousUrl: getPreviousPageUrl(state.pagination.meals.superAdmin),
});

export default connect(
  mapStateToProps,
  { modifyMenu: updateMenu, fetchMeals },
)(UpdateMenu);
