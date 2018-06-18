import history from './history';
import initialState from '../reducers/initialState';
import configureStore from '../store/configureStore';
import { userSignInError } from '../actions/userActions';
import { removeUser } from './persistUser';

const axiosErrorWrapper = (error) => {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  if (error.response) {
    const response = error.response;
    // Handle input validation error
    if (response.status === 400) {
      return response.data.error;
    }
    if (response.status === 401 || response.status === 403) {
      const store = configureStore(initialState);
      removeUser();
      store.dispatch(userSignInError(response.data.error));
      history.push('/signin');
      return response.data.error;
    }
    return response.data.message;
  }
  // The request was made but no response was received
  return error.request;
};

export default axiosErrorWrapper;
