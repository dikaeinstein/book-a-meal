import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Loading from '../util/Loading';
import MealsCheckBoxForm from './MealsCheckBoxForm';
import { fetchMeals } from '../../actions/mealActions';
import { updateMenu } from '../../actions/menuActions';

class ConnectedUpdateMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeals();
  }

  handleSubmit(values) {
    this.props.modifyMenu(values, this.props.menuId);
  }

  render() {
    const {
      meals, error, isUpdating, isFetching,
    } = this.props;

    return (
      <section>
        <h2 className="text-center">Update Menu</h2>
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
            isSubmitting={isUpdating}
          />}
      </section>
    );
  }
}

ConnectedUpdateMenu.propTypes = {
  modifyMenu: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  menuId: PropTypes.string.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  error: state.menus.saveError,
  meals: state.meals.data,
  isUpdating: state.menus.isUpdating,
  isFetching: state.meals.isFetching,
  menuId: state.menus.data.menu.id,
});

const mapDispatchToProps = dispatch => ({
  modifyMenu: (values, menuId) => dispatch(updateMenu(values, menuId)),
  fetchMeals: () => dispatch(fetchMeals()),
});

const UpdateMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedUpdateMenu);

export default UpdateMenu;
