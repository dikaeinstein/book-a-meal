import { USER_SIGNED_IN, ADMIN_SIGNED_IN } from '../constants/actionTypes';

export const userSignedIn = urls => ({
  type: USER_SIGNED_IN,
  urls,
});

export const userSignedUp = urls => ({
  type: ADMIN_SIGNED_IN,
  urls,
});
