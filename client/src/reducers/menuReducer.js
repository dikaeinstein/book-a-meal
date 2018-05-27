import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_ERROR,
} from '../constants/actionTypes';
import initialState from '../reducers/initialState';

const menuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_MENU_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case FETCH_MENU_SUCCESS:
      return { ...state, isFetching: false, data: action.payload.response };
    default:
      return state;
  }
};

export default menuReducer;
