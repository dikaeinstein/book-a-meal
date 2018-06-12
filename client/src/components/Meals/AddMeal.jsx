import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import AddMealForm from './AddMealForm';
import mealSchema from '../../validation/mealSchema';
import { addMeal } from '../../actions/mealActions';


const ConnectedAddMeal = ({ saveMeal }) => {
  const handleSubmit = (values, actions) => {
    saveMeal(values, actions);
  };
  return (
    <section className="add-section">
      <h2 className="text-dark text-center">Add New Meal</h2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          imageUrl: '',
        }}
        validationSchema={mealSchema}
        component={AddMealForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

ConnectedAddMeal.propTypes = {
  saveMeal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  saveMeal: (values, actions) => dispatch(addMeal(values, actions)),
});

const AddMeal = connect(null, mapDispatchToProps)(ConnectedAddMeal);

export default AddMeal;
