import config from '../config';
import history from '../helpers/history';
import userService from '../helpers/userService';
import transformError from '../helpers/transformError';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
import notify from '../helpers/notify';
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_ERROR,
  USER_SIGN_OUT,
}
  from '../constants/userActionTypes';

/**
 * User signin success action creator
 *
 * @param {object} user Signed user object
 *
 * @returns {object} Redux action
 */
export const userSignInSuccess = user => ({
  type: USER_SIGN_IN_SUCCESS,
  payload: { user },
});

/**
 * User signin error action creator
 *
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const userSignInError = error => ({
  type: USER_SIGN_IN_ERROR,
  payload: { error },
});

/**
 * Auto navigates user to appropriate page after signin
 *
 * @param {object} user Signed in user object
 * @param {object} location Browser location object
 */
export const autoNavigate = (user, location) => {
  const { role } = user;
  if (location && !['/', '/signin', '/signup'].includes(location)) {
    history.push(location);
  } else if (role === 'customer') {
    history.push('/user-menu');
  } else if (role === 'superAdmin' || role === 'caterer') {
    history.push('/dashboard');
  }
};

/**
 * User signout action creator
 *
 * @returns {object} Redux action
 */
export const userSignOut = () => ({ type: USER_SIGN_OUT });

/**
 * User signin async action creator
 *
 * @param {object} values Signin form values
 * @param {object} actions Form actions
 * @param {object} location Browser location object
 *
 * @returns {Function} Async function
 */
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
    dispatch(userSignInError(axiosErrorWrapper(error)));
    notify.error('Error signing in');
  }
};

/**
 * User signup async action creator
 *
 * @param {object} values Signin form values
 * @param {object} actions Form actions
 *
 * @returns {Function} Async function
 */
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
    dispatch(userSignInError(axiosErrorWrapper(error)));
  }
};
