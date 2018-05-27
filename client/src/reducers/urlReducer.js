import { USER_SIGNED_IN, ADMIN_SIGNED_IN } from '../constants/actionTypes';
import initialState from '../reducers/initialState';

const urlReducer = (state = initialState.urls, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return action.urls;
    case ADMIN_SIGNED_IN:
      return action.urls;
    default:
      return state;
  }
};

export default urlReducer;
