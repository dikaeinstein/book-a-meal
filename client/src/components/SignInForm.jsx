import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import Label from '../components/Label';
import Button from '../components/Button';

const SignInForm = (props) => {
  const {
    errors,
    touched,
    isSubmitting,
  } = props;
  return (
    <Form className="form card">
      <h2 className="text-center">Sign In</h2>
      <p className="text-center font-weight-bold">
        Sign in to book a meal now
      </p>
      <div>
        <Label className="label label-block" htmlFor="email">
          Email address:
        </Label>
        <Field
          type="email"
          placeholder="johndoe@domain.com"
          id="email"
          name="email"
          required
          className={touched.email
          && errors.email ? 'input-error' : ''}
        />
        {
          touched.email
          && errors.email
          && <div className="error">{errors.email}</div>
        }
      </div>
      <div>
        <Label className="label label-block" htmlFor="password">
          Password:
        </Label>
        <Field
          type="password"
          placeholder="Enter password"
          id="password"
          name="password"
          required
          className={touched.password
          && errors.password ? 'input-error' : ''}
        />
        {
          touched.password
          && errors.password
          && <div className="error">{errors.password}</div>
        }
      </div>
      <Button
        value="Sign In"
        type="submit"
        className="btn btn-default btn-default-lg font-weight-bold"
        disabled={isSubmitting}
      />
      <p className="form-footer text-right">
        Don&apos;t have an account?
        {' '}
        <span>
          <a href="signup.html" className="btn btn-alt font-weight-bold">
            Sign Up
          </a>
        </span>
      </p>
    </Form>
  );
};

SignInForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default SignInForm;
