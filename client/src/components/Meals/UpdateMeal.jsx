import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ConnectedUpdateMealForm from './UpdateMealForm';
import mealSchema from '../../validation/mealSchema';
import { updateMeal } from '../../actions/mealActions';


export const UpdateMeal = ({ editMeal, meal, closeModal }) => {
  const handleSubmit = async (values, actions) => {
    await editMeal(values, actions, meal.id);
    return closeModal();
  };
  return (
    <section className="add-section">
      <h4 className="text-center">Update Meal</h4>
      <Formik
        initialValues={meal}
        validationSchema={mealSchema}
        component={ConnectedUpdateMealForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

UpdateMeal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number])).isRequired,
  editMeal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(null, { editMeal: updateMeal })(UpdateMeal);
