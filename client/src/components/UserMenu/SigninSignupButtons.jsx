import React from 'react';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import Button from '../util/Button';

const SigninSignupButtons = ({ closeModal }) => {
  const handleSignin = () => {
    closeModal();
    history.push('/signin');
  };
  const handleSignup = () => {
    closeModal();
    history.push('/signup');
  };

  const btnStyle = {
    margin: '1rem',
  };

  return (
    <div>
      <div className="m1">
        <p
          className="font-weight-bold"
          style={{
            marginBottom: '1rem',
            fontSize: '1.25rem',
          }}
        >
          You are not logged in
        </p>
        <p>
          Log in or sign up to continue.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          className="btn btn-default"
          value="Sign in"
          onClick={handleSignin}
          style={btnStyle}
        />
        <Button
          className="btn btn-default"
          value="Sign up"
          onClick={handleSignup}
          style={btnStyle}
        />
      </div>
    </div>);
};

SigninSignupButtons.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SigninSignupButtons;
