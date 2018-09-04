import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as userActions from '../../actions/userActions';
import * as userActionTypes from '../../constants/userActionTypes';
import config from '../../config';
import initialState from '../../reducers/initialState';

describe('userActions', () => {
  let store;
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
  });
  beforeEach(() => {
    store.clearActions();
  });
  it('creates USER_SIGN_IN_SUCCESS when sign in is successful', () => {
    const user = { name: 'Dika Test', role: 'customer' };
    mock
      .onPost(`${config.API_BASE_URL}/api/v1/auth/signin`)
      .reply(200, { user });
    const expectedActions = [
      { type: userActionTypes.USER_SIGN_IN_REQUEST },
      { type: userActionTypes.USER_SIGN_IN_SUCCESS, payload: { user } },
    ];

    return store.dispatch(userActions.userSignIn(
      { email: 'solo@mail.com', password: 'password' },
      { setSubmitting: jest.fn, setErrors: jest.fn },
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates USER_SIGN_UP_SUCCESS when sign up is successful', () => {
    const user = { name: 'Ann Test', role: 'caterer' };
    mock
      .onPost(`${config.API_BASE_URL}/api/v1/auth/signup`)
      .reply(200, { user });
    const expectedActions = [
      { type: userActionTypes.USER_SIGN_IN_REQUEST },
      { type: userActionTypes.USER_SIGN_IN_SUCCESS, payload: { user } },
    ];

    return store.dispatch(userActions.userSignUp(
      { email: 'ann.test@mail.com', password: 'password', ...user },
      { setSubmitting: jest.fn, setErrors: jest.fn },
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates USER_SIGN_IN_ERROR when sign in fails', () => {
    const error = { message: 'User does not exist' };
    mock
      .onPost(`${config.API_BASE_URL}/api/v1/auth/signin`)
      .reply(404, { ...error });
    const expectedActions = [
      { type: userActionTypes.USER_SIGN_IN_REQUEST },
      {
        type: userActionTypes.USER_SIGN_IN_ERROR,
        payload: { error: error.message },
      },
    ];

    return store.dispatch(userActions.userSignIn(
      { email: 'solo@mail.com', password: 'password' },
      { setSubmitting: jest.fn, setErrors: jest.fn },
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates USER_SIGN_IN_ERROR when sign up fails', () => {
    const user = { name: 'Ann Test', role: 'caterer' };
    const error = { message: 'User already exist' };
    mock
      .onPost(`${config.API_BASE_URL}/api/v1/auth/signup`)
      .reply(404, { ...error });
    const expectedActions = [
      { type: userActionTypes.USER_SIGN_IN_REQUEST },
      {
        type: userActionTypes.USER_SIGN_IN_ERROR,
        payload: { error: error.message },
      },
    ];

    return store.dispatch(userActions.userSignUp(
      { email: 'ann.test@mail.com', password: 'password', ...user },
      { setSubmitting: jest.fn, setErrors: jest.fn },
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should create an action to sign out user', () => {
    const expectedAction = { type: userActionTypes.USER_SIGN_OUT };
    expect(userActions.userSignOut()).toEqual(expectedAction);
  });
});
