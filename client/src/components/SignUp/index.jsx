import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import SignUpForm from './SignUpForm';
import SideImage from '../util/SideImage';
import userSignupSchema from '../../validation/userSignupSchema';
import { userSignUp } from '../../actions/userActions';

const ConnectedSignUp = ({ signUp }) => {
  const handleSubmit = (values, actions) => {
    signUp(values, actions);
  };
  return (
    <main className="flex-container">
      <SideImage id="signUp" />
      <section id="signIn" className="col-1-4 aside bg-dark">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
          }}
          validationSchema={userSignupSchema}
          component={SignUpForm}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
};

ConnectedSignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  signUp: (values, actions) => dispatch(userSignUp(values, actions, ownProps.history)),
});

const SignUp = connect(null, mapDispatchToProps)(ConnectedSignUp);

export default SignUp;
