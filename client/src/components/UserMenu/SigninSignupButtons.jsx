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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
    </div>);
};

SigninSignupButtons.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SigninSignupButtons;
