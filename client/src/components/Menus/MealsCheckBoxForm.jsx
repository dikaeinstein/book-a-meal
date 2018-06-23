import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Button from '../util/Button';
import { fetchMeals } from '../../actions/mealActions';
import Loading from '../util/Loading';
import Label from '../util/Label';
import '../../static/sass/materialize.scss';

class ConnectedMealsCheckBoxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Menu for today',
      mealIds: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCheckboxList = this.renderCheckboxList.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeals();
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

  renderCheckboxList() {
    const { meals } = this.props;
    return meals.map(meal => (
      <p key={meal.id}>
        <label>
          <input
            type="checkbox"
            name="meals"
            value={meal.id}
            onClick={(event) => {
              if (event.target.checked) {
                this.setState({
                  mealIds: [
                    ...this.state.mealIds,
                    event.target.value,
                  ],
                });
              }
            }}
            required
          />
          <span>{meal.name}</span>
        </label>
      </p>
    ));
  }

  render() {
    const formStyle = {
      margin: '1rem auto',
      padding: '1rem 2rem 2rem 2rem',
    };

    return (
      this.props.isFetching
        ?
          <Loading text="Fetching meals . . .">
            <Preloader />
          </Loading>
        :
          <form
            className="text-dark form card"
            style={formStyle}
            onSubmit={this.handleSubmit}
          >
            <h4 className="text-center">Select meals to add to menu</h4>
            <Label className="label label-block" htmlFor="name">
              Menu Name:
            </Label>
            <input
              name="name"
              placeholder="Enter menu name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <h4>Meals</h4>
            {this.renderCheckboxList()}
            <Button
              value="Set Menu"
              type="submit"
              className="btn btn-alt"
            />
          </form>
    );
  }
}

ConnectedMealsCheckBoxForm.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMeals: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals.data,
  isFetching: state.meals.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchMeals: () => dispatch(fetchMeals()),
});

const MealsCheckBoxForm =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ConnectedMealsCheckBoxForm);

export default MealsCheckBoxForm;
