import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import { ProgressBar } from 'react-materialize';
import Label from '../util/Label';
import Button from '../util/Button';
import Loading from '../util/Loading';

const SignUpForm = (props) => {
  const {
    errors,
    touched,
    isSubmitting,
  } = props;
  return (
    <Form className="form card">
      <h2 className="text-center">Sign Up</h2>
      <p className="text-center font-weight-bold">
        Sign up to book a meal now
      </p>
      <div>
        <Label className="label label-block" htmlFor="name">
          Full name
        </Label>
        <Field
          placeholder="Enter full name"
          id="name"
          name="name"
          required
          className={touched.name
          && errors.name ? 'input-error' : ''}
        />
        {
          touched.name
          && errors.name
          && <div className="error">{errors.name}</div>
        }
      </div>
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
      <div>
        <Label className="label label-block" htmlFor="confirmPassword">
          Confirm Password:
        </Label>
        <Field
          type="password"
          placeholder="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className={touched.confirmPassword
          && errors.confirmPassword ? 'input-error' : ''}
        />
        {
          touched.confirmPassword
          && errors.confirmPassword
          && <div className="error">{errors.confirmPassword}</div>
        }
      </div>
      <div>
        <Label className="label label-block" htmlFor="customer">
          Sign up as:
        </Label>
        <Field component="select" name="role" id="role" required>
          <option value="customer">Customer</option>
          <option value="caterer">Caterer</option>
        </Field>
      </div>
      <Button
        value="Sign Up"
        type="submit"
        className="btn btn-default btn-default-lg font-weight-bold"
        disabled={isSubmitting}
      />
      {isSubmitting ?
        <Loading text="signing in">
          <ProgressBar />
        </Loading>
        : null}
    </Form>
  );
};

SignUpForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default SignUpForm;
