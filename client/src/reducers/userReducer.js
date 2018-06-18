import initialState from './initialState';
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../constants/actionTypes';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case USER_SIGN_IN_REQUEST:
      return { ...state, isSubmitting: true };
    case USER_SIGN_IN_ERROR:
      return {
        ...state,
        isSubmitting: false,
        loggedIn: false,
        error: action.payload.error,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        loggedIn: true,
        data: action.payload.user,
        error: null,
      };
    case USER_SIGN_OUT:
      return { ...state, loggedIn: false, data: initialState.user.data };
    default:
      return state;
  }
};

export default userReducer;
