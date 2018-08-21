import history from './history';
import { userSignInError } from '../actions/userActions';
import { removeUser } from './persistUser';

/**
 * Error wrapper around axios response errors
 *
 * @param {object} error Axios error
 * @param {Function} dispatch Redux dispatch function
 *
 * @returns {string} Error message
 */
const axiosErrorWrapper = (error, dispatch) => {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  if (error.response) {
    const response = error.response;
    // Handle input validation error
    if (response.status === 400) {
      return response.data.error;
    }
    if (response.status === 401 || response.status === 403) {
      dispatch(userSignInError(response.data.error));
      removeUser();
      history.push('/signin');
      return null;
    }
    return response.data.message;
  }
  // The request was made but no response was received
  return error.request;
};

export default axiosErrorWrapper;
