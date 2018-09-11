import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ConnectedUpdateMealForm from './UpdateMealForm';
import mealSchema from '../../validation/mealSchema';
import { updateMeal } from '../../actions/mealActions';


export const UpdateMeal = ({ editMeal, meal, closeModal }) => {
  const currentMeal = {
    name: meal.name,
    description: meal.description,
    price: meal.price,
    imageUrl: meal.imageUrl,
  };
  const handleSubmit = async (values, actions) => {
    await editMeal(values, actions, meal.id);
    return closeModal();
  };
  return (
    <section className="add-section">
      <h5 className="text-center font-weight-bold">Update Meal</h5>
      <Formik
        initialValues={currentMeal}
        validationSchema={mealSchema}
        component={ConnectedUpdateMealForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

UpdateMeal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.object])).isRequired,
  editMeal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(null, { editMeal: updateMeal })(UpdateMeal);
