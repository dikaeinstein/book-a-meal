import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuCheckBoxForm from './MenuCheckBoxForm';
import { fetchMeals } from '../../actions/mealActions';
import { setupMenu } from '../../actions/menuActions';
import { getMeals } from '../../reducers/mealReducer';
import {
  getCurrentPageUrl,
  getNextPageUrl,
  getPreviousPageUrl,
} from '../../reducers/paginationReducer';

class ConnectedSetupMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.handlePageChange(this.props.currentUrl);
  }

  async handleSubmit(values) {
    await this.props.setMenu(values);
    this.props.closeModal();
  }

  handlePageChange(url) {
    this.props.fetchMeals(url);
  }

  render() {
    const { meals, error, isSaving } = this.props;

    return (
      <section>
        <h5 className="text-center">Set Up Menu</h5>
        <MenuCheckBoxForm
          error={error}
          handleSubmit={this.handleSubmit}
          meals={meals}
          action="Set"
          isSubmitting={isSaving}
          nextUrl={this.props.nextUrl}
          currentUrl={this.props.currentUrl}
          previousUrl={this.props.previousUrl}
          onPageChange={this.handlePageChange}
        />
      </section>
    );
  }
}

ConnectedSetupMenu.propTypes = {
  setMenu: PropTypes.func.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMeals: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
};

const mapStateToProps = state => ({
  error: state.menu.saveError,
  meals: getMeals(state.meals),
  isSaving: state.menu.isSaving,
  currentUrl: getCurrentPageUrl(state.pagination.meals.superAdmin),
  nextUrl: getNextPageUrl(state.pagination.meals.superAdmin),
  previousUrl: getPreviousPageUrl(state.pagination.meals.superAdmin),
});

const mapDispatchToProps = dispatch => ({
  setMenu(values) { dispatch(setupMenu(values)); },
  fetchMeals(url) { dispatch(fetchMeals(url)); },
});

const SetupMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedSetupMenu);

export default SetupMenu;
