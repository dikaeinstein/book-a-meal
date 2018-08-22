import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import SignInForm from './SignInForm';
import SideImage from '../util/SideImage';
import userSigninSchema from '../../validation/userSigninSchema';
import { userSignIn } from '../../actions/userActions';

const ConnectedSignIn = ({ signIn }) => {
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

ConnectedSignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signIn(values, actions) { dispatch(userSignIn(values, actions)); },
});

const SignIn = connect(null, mapDispatchToProps)(ConnectedSignIn);

export default SignIn;
