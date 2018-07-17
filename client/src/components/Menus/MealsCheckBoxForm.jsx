import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-materialize';
import Loading from '../util/Loading';
import Label from '../util/Label';
import MealsCheckBoxList from './MealsCheckboxList';
import '../../static/sass/materialize.scss';

class MealsCheckBoxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Menu for today',
      mealIds: [],
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
      this.setState({
        mealIds: [
          ...this.state.mealIds,
          event.target.value,
        ],
      });
    } else {
      const filteredMealIds = this.state.mealIds.filter(mealId =>
        mealId !== event.target.value);

      this.setState({ mealIds: filteredMealIds });
    }
  }

  render() {
    return (
      <form
        className="form card"
        onSubmit={this.handleSubmit}
      >
        <h3
          className="text-center"
          style={{ margin: '.5rem 0 1rem 0' }}
        >
          Select meals to add to menu
        </h3>
        <div>
          <Label className="label label-block" htmlFor="name">
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
          <h3 style={{ margin: '.5rem 0' }}>Meals</h3>
          <MealsCheckBoxList
            meals={this.props.meals}
            handleCheck={this.handleCheck}
          />
        </div>
        <button
          value="Set Menu"
          type="submit"
          className="btn btn-default"
          style={{ margin: '2rem auto 1rem auto' }}
        >
          {this.props.action} Menu
        </button>
        {this.props.isSubmitting ?
          <Loading text="signing in">
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

MealsCheckBoxForm.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  action: PropTypes.string.isRequired,
};

export default MealsCheckBoxForm;
