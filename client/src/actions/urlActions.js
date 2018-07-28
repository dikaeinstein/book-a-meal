import {
  USER_SIGN_IN_SUCCESS,
  ADMIN_SIGN_IN_SUCCESS,
}
  from '../constants/userActionTypes';

export const userSignedIn = urls => ({
  type: USER_SIGN_IN_SUCCESS,
  urls,
});

export const adminSignedIn = urls => ({
  type: ADMIN_SIGN_IN_SUCCESS,
  urls,
});
