import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_ERROR,
} from '../../constants/userActionTypes';
import initialState from '../../reducers/initialState';
import reducer, { adminUrls, customerUrls } from '../../reducers/urlReducer';

describe('url reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.urls);
  });
  it('should handle USER_SIGN_IN_SUCCESS for admin', () => {
    expect(reducer(initialState.urls, {
      type: USER_SIGN_IN_SUCCESS,
      payload: { user: { role: 'caterer' } },
    })).toEqual(adminUrls);
  });
  it('should handle USER_SIGN_IN_SUCCESS for customer', () => {
    expect(reducer(initialState.urls, {
      type: USER_SIGN_IN_SUCCESS,
      payload: { user: { role: 'customer' } },
    })).toEqual(customerUrls);
  });
  it('should handle USER_SIGN_IN_ERROR and USER_SIGN_IN_OUT', () => {
    expect(reducer(initialState.urls, {
      type: USER_SIGN_IN_ERROR,
      payload: { user: { role: 'customer' } },
    })).toEqual(initialState.urls);
  });
});
