import config from '../config';
import history from '../helpers/history';
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_SIGN_OUT,
}
  from '../constants/actionTypes';
import userService from '../helpers/userService';

export const userSignInSuccess = user => ({
  type: USER_SIGN_IN_SUCCESS,
  payload: { user },
});

export const userSignInError = error => ({
  type: USER_SIGN_IN_ERROR,
  payload: { error },
});

export const autoNavigate = (user, location) => {
  if (location && !['/', '/signin', '/signup'].includes(location.pathname)) {
    history.push(location);
  } else if (user.role === 'customer') {
    history.push('/user-menu');
  } else {
    history.push('/caterer-dashboard');
  }
};

export const userSignOut = () => ({ type: USER_SIGN_OUT });

export const userSignIn = (values, actions, location) => async (dispatch) => {
  const { setSubmitting } = actions;
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST });
    setSubmitting(true);
    const user = await userService
      .signIn(`${config.API_BASE_URL}/api/v1/auth/signin`, values);
    setSubmitting(false);
    dispatch(userSignInSuccess(user));
    autoNavigate(user, location);
  } catch (error) {
    setSubmitting(false);
    dispatch(userSignInError(error));
  }
};

export const userSignUp = (values, actions, location) => async (dispatch) => {
  const { setSubmitting } = actions;
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST });
    setSubmitting(true);
    const user = await userService
      .signIn(`${config.API_BASE_URL}/api/v1/auth/signup`, values);
    setSubmitting(false);
    dispatch(userSignInSuccess(user));
    autoNavigate(user, location);
  } catch (error) {
    setSubmitting(false);
    dispatch(userSignInError(error));
  }
};
