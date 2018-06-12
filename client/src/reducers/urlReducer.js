import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  USER_SIGN_IN_ERROR,
} from '../constants/actionTypes';
import initialState from '../reducers/initialState';

const customerUrls = [
  {
    id: 1,
    name: 'Menu',
    link: 'user-menu',
  },
  {
    id: 2,
    name: 'Orders',
    link: 'user-order-history',
  },
  {
    id: 3,
    name: 'Dikaeinstein',
    link: 'user-details',
  },
  {
    id: 4,
    name: 'Logout',
    link: 'signout',
  },
];

const adminUrls = [
  {
    id: 1,
    name: 'Dashboard',
    link: 'caterer-dashboard',
  },
  {
    id: 2,
    name: 'Meals',
    link: 'meals',
  },
  {
    id: 3,
    name: 'Menus',
    link: 'menus',
  },
  {
    id: 4,
    name: 'Caterer',
    link: 'user-details',
  },
  {
    id: 5,
    name: 'Logout',
    link: 'signout',
  },
];

const urlReducer = (state = initialState.urls, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      return action.payload.user.role === 'caterer' ?
        adminUrls : customerUrls;
    case USER_SIGN_IN_ERROR:
      return initialState.urls;
    case USER_SIGN_OUT:
      return initialState.urls;
    default:
      return state;
  }
};

export default urlReducer;