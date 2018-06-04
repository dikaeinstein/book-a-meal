import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import SignInForm from './SignInForm';
import SideImage from './SideImage';
import userSchema from '../helpers/userSchema';
import { userSignIn } from '../actions/userActions';

const ConnectedSignIn = ({ signIn, location }) => {
  const handleSubmit = (values, actions) => {
    signIn(values, actions, location);
  };
  return (
    <main className="flex-container">
      <SideImage id="signIn" />
      <section id="signIn" className="col-1-4 aside">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={userSchema}
          component={SignInForm}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
};

ConnectedSignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  location: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signIn: (values, actions) => dispatch(userSignIn(values, actions)),
});

const SignIn = connect(null, mapDispatchToProps)(ConnectedSignIn);

export default SignIn;
