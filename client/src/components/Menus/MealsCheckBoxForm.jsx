import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Label from '../util/Label';
import Button from '../util/Button';

const ConnectedMealsCheckBoxForm = ({ meals }) => {
  const mealCheckBoxList = meals.map(meal => (
    <div>
      <Label htmlFor={meal.name}>{meal.name}</Label>
      <input type="checkbox" name={meal.name} value={meal.id} />
    </div>
  ));

  const handleSubmit = (event) => {
    console.log(event.)
  };

  return (
    <form onSubmit={handleSubmit}>
      {mealCheckBoxList}
      <Button value="Set Menu" type="submit" />
    </form>
  );
};

ConnectedMealsCheckBoxForm.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals.data,
});

const MealsCheckBoxForm =
  connect(mapStateToProps)(ConnectedMealsCheckBoxForm);

export default MealsCheckBoxForm;
