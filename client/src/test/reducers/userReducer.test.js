import initialState from '../../reducers/initialState';
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../../constants/userActionTypes';
import reducer, { getUser } from '../../reducers/userReducer';


describe('user reducer', () => {
  it('should handle USER_SIGN_IN_REQUEST', () => {
    expect(reducer(initialState.user, { type: USER_SIGN_IN_REQUEST }))
      .toEqual({ ...initialState.user, isSubmitting: true });
  });
  it('should handle USER_SIGN_IN_SUCCESS', () => {
    expect(reducer(initialState.user, {
      type: USER_SIGN_IN_SUCCESS,
      payload: {
        user: {
          name: 'test user',
          role: 'customer',
        },
      },
    })).toEqual({
      isSubmitting: false,
      loggedIn: true,
      data: { role: 'customer', name: 'test user' },
      error: null,
    });
  });
  it('should handle USER_SIGN_IN_ERROR', () => {
    expect(reducer(initialState.user, {
      type: USER_SIGN_IN_ERROR,
      payload: { error: 'Error signing in' },
    })).toEqual({
      ...initialState.user,
      isSubmitting: false,
      loggedIn: false,
      error: 'Error signing in',
    });
  });
  it('should handle USER_SIGN_OUT', () => {
    expect(reducer(initialState.user, { type: USER_SIGN_OUT })).toEqual({
      loggedIn: false,
      data: initialState.user.data,
      ...initialState.user,
    });
  });
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.user);
  });
  it('should return user when "getUser" is called', () => {
    const data = {
      name: 'test user',
      role: 'caterer',
    };
    const state = { data };
    expect(getUser(state)).toEqual(data);
  });
});
