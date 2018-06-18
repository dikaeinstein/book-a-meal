import initialState from './initialState';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
} from '../constants/actionTypes';

const orderReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_ORDERS_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.orders,
        error: null,
      };
    default:
      return state;
  }
};

export default orderReducer;
