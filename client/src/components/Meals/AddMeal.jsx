import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ConnectedAddMealForm from './AddMealForm';
import mealSchema from '../../validation/mealSchema';
import { addMeal } from '../../actions/mealActions';


export const AddMeal = ({ saveMeal, closeModal }) => {
  const handleSubmit = async (values, actions) => {
    await saveMeal(values, actions);
    return closeModal();
  };

  return (
    <section className="add-section">
      <h2 className="text-center">Add New Meal</h2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          imageUrl: undefined,
        }}
        validationSchema={mealSchema}
        component={ConnectedAddMealForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

AddMeal.propTypes = {
  saveMeal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(null, { saveMeal: addMeal })(AddMeal);
