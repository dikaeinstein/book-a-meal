import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-materialize';
import Loading from '../util/Loading';
import Label from '../util/Label';
import ConnectedMealsCheckboxList from './MealsCheckboxList';
import Paginate from '../util/Paginate';
import '../../static/sass/materialize.scss';

class MealsCheckBoxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.defaultMenuName,
      mealIds: this.props.defaultMenuMealIds,
      checked: this.props.defaultMenuMealIds
        .reduce((obj, key) => ({ ...obj, [`meal-${key}`]: true }), {}),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit({
      name: this.state.name,
      mealIds: this.state.mealIds,
    });
  }

  handleCheck(event) {
    if (event.target.checked) {
      // Extract mealId from input name
      const mealId = event.target.name.slice(5);
      this.setState({
        mealIds: [...this.state.mealIds, parseInt(mealId, 10)],
        checked: {
          ...this.state.checked,
          [event.target.name]: true,
        },
      });
    } else {
      const mealId = event.target.name.slice(5);
      const filteredMealIds = this.state.mealIds.filter(OldMealId =>
        OldMealId !== parseInt(mealId, 10));

      this.setState({
        mealIds: filteredMealIds,
        checked: {
          ...this.state.checked,
          [event.target.name]: false,
        },
      });
    }
  }

  render() {
    return (
      <form
        className="form card"
        onSubmit={this.handleSubmit}
      >
        <h6
          className="text-center"
          style={{ margin: '.5rem 0 1rem 0' }}
        >
          Select meals to add to menu
        </h6>
        <div>
          <Label
            className="label label-block font-weight-bold"
            htmlFor="name"
          >
            Menu Name:
          </Label>
          <input
            name="name"
            placeholder="Enter menu name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <h6
            style={{ margin: '.5rem 0' }}
            className="font-weight-bold"
          >
            Meals
          </h6>
          <ConnectedMealsCheckboxList
            meals={this.props.meals}
            checkedMeals={this.state.checked}
            handleCheck={this.handleCheck}
          />
          <Paginate
            onPageChange={this.props.onPageChange}
            nextUrl={this.props.nextUrl}
            previousUrl={this.props.previousUrl}
            style={{ marginTop: '0' }}
          />
        </div>
        <button
          value="Set Menu"
          type="submit"
          className="btn btn-default"
          style={{ margin: '0 auto 1rem auto' }}
        >
          {this.props.action} Menu
        </button>
        {this.props.isSubmitting ?
          <Loading text="setting menu">
            <ProgressBar />
          </Loading>
          : null}
        {!this.props.isSubmitting && this.props.error ?
          <div className="error">{this.props.error}</div>
          : null
        }
      </form>
    );
  }
}

MealsCheckBoxForm.defaultProps = {
  defaultMenuName: 'Menu for Today',
  defaultMenuMealIds: [],
};

MealsCheckBoxForm.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultMenuName: PropTypes.string,
  defaultMenuMealIds: PropTypes.arrayOf(PropTypes.number),
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  action: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
};

export default MealsCheckBoxForm;
