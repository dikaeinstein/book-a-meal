import config from '../config';
import history from '../helpers/history';
import userService from '../helpers/userService';
import transformError from '../helpers/transformError';
import notify from '../helpers/notify';
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_SIGN_OUT,
}
  from '../constants/userActionTypes';

export const userSignInSuccess = user => ({
  type: USER_SIGN_IN_SUCCESS,
  payload: { user },
});

export const userSignInError = error => ({
  type: USER_SIGN_IN_ERROR,
  payload: { error },
});

export const autoNavigate = (user, location) => {
  const { role } = user;
  if (location && !['/', '/signin', '/signup'].includes(location.pathname)) {
    history.push(location);
  }
  if (role === 'customer') {
    history.push('/user-menu');
  } else {
    history.push('/dashboard');
  }
};

export const userSignOut = () => ({ type: USER_SIGN_OUT });

export const userSignIn = (values, actions, location) => async (dispatch) => {
  const { setSubmitting, setErrors } = actions;
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST });
    setSubmitting(true);
    const user = await userService
      .signIn(`${config.API_BASE_URL}/api/v1/auth/signin`, values);
    setSubmitting(false);
    dispatch(userSignInSuccess(user));
    autoNavigate(user, location);
    notify.success(`Welcome ${user.name}`);
  } catch (error) {
    setSubmitting(false);
    setErrors({
      signIn: transformError(
        error,
        'Error signing in, Please try again',
      ),
    });
    dispatch(userSignInError(error));
    notify.error('Error signing in');
  }
};

export const userSignUp = (values, actions) => async (dispatch) => {
  const { setSubmitting, setErrors } = actions;
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST });
    setSubmitting(true);
    const user = await userService
      .signIn(`${config.API_BASE_URL}/api/v1/auth/signup`, values);
    setSubmitting(false);
    dispatch(userSignInSuccess(user));
    autoNavigate(user);
  } catch (error) {
    setSubmitting(false);
    setErrors({
      signUp: transformError(
        error,
        'Error signing up, Please try again',
      ),
    });
    dispatch(userSignInError(error));
  }
};
