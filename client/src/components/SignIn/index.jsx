import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import SignInForm from './SignInForm';
import SideImage from '../util/SideImage';
import userSigninSchema from '../../validation/userSigninSchema';
import { userSignIn } from '../../actions/userActions';

export const SignIn = ({ signIn }) => {
  const handleSubmit = (values, actions) => {
    signIn(values, actions);
  };

  return (
    <main className="flex-container">
      <SideImage id="signIn" />
      <section id="signIn" className="col-1-4 aside bg-dark">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={userSigninSchema}
          component={SignInForm}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(null, { signIn: userSignIn })(SignIn);
