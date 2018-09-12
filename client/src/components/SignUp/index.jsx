import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import SignUpForm from './SignUpForm';
import SideImage from '../util/SideImage';
import userSignupSchema from '../../validation/userSignupSchema';
import { userSignUp } from '../../actions/userActions';
import ErrorBoundary from '../util/ErrorBoundary';

export const SignUp = ({ signUp }) => {
  const handleSubmit = (values, actions) => {
    signUp(values, actions);
  };
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connect(null, { signUp: userSignUp })(SignUp);
