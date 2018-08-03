import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import swal from 'sweetalert';
import AddMealForm from './AddMealForm';
import mealSchema from '../../validation/mealSchema';
import { addMeal } from '../../actions/mealActions';


const ConnectedAddMeal = ({ saveMeal, closeModal }) => {
  const handleSubmit = async (values, actions) => {
    await saveMeal(values, actions);
    await swal({
      text: 'Meal added successfully',
      icon: 'success',
      className: 'swal-button--confirm',
    });
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
        component={AddMealForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

ConnectedAddMeal.propTypes = {
  saveMeal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  saveMeal: (values, actions) => dispatch(addMeal(values, actions)),
});

const AddMeal = connect(null, mapDispatchToProps)(ConnectedAddMeal);

export default AddMeal;
