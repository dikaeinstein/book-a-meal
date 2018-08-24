import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import MealsCheckBoxForm from './MealsCheckBoxForm';
import Loading from '../util/Loading';
import { fetchMeals } from '../../actions/mealActions';
import { setupMenu, fetchMenu } from '../../actions/menuActions';
import { getMeals } from '../../reducers/mealReducer';

class ConnectedSetupMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeals();
  }

  async handleSubmit(values) {
    await this.props.setMenu(values);
    this.props.fetchMenu();
    return this.props.closeModal();
  }

  render() {
    const {
      meals, error, isSaving, isFetching,
    } = this.props;

    return (
      <section>
        <h2 className="text-center">Set Up Menu</h2>
        {isFetching
        ?
          <Loading text="Fetching meals . . .">
            <Preloader />
          </Loading>
        :
          <MealsCheckBoxForm
            error={error}
            handleSubmit={this.handleSubmit}
            meals={meals}
            action="Set"
            isSubmitting={isSaving}
          />}
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
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.menu.saveError,
  meals: getMeals(state.meals),
  isFetching: state.meals.isFetching,
  isSaving: state.menu.isSaving,
});

const mapDispatchToProps = dispatch => ({
  setMenu(values) { dispatch(setupMenu(values)); },
  fetchMeals() { dispatch(fetchMeals()); },
  fetchMenu() { dispatch(fetchMenu()); },
});

const SetupMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedSetupMenu);

export default SetupMenu;
