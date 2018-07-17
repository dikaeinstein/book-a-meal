import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import UpdateMealForm from './UpdateMealForm';
import mealSchema from '../../validation/mealSchema';
import { updateMeal } from '../../actions/mealActions';


const ConnectedUpdateMeal = ({ editMeal, meal }) => {
  const handleSubmit = (values, actions) => {
    editMeal(values, actions, meal.id);
  };
  return (
    <section className="add-section">
      <h2 className="text-center">Update Meal</h2>
      <Formik
        initialValues={meal}
        validationSchema={mealSchema}
        component={UpdateMealForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

ConnectedUpdateMeal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number])).isRequired,
  editMeal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  editMeal: (values, actions, id) => dispatch(updateMeal(values, actions, id)),
});

const UpdateMeal = connect(null, mapDispatchToProps)(ConnectedUpdateMeal);

export default UpdateMeal;
