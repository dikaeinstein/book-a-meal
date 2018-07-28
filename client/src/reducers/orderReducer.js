import produce from 'immer';
import initialState from './initialState';
import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_ERROR,
  MAKE_ORDER_ERROR,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  CHECKOUT_ORDER,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../constants/orderActionTypes';

const orderReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_USER_ORDERS_ERROR:
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload.error,
      };
    case FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          userOrders: action.payload.orders,
        },
        fetchError: null,
      };
    case MAKE_ORDER_ERROR:
      return {
        ...state,
        isSaving: false,
        saveError: action.payload.error,
      };
    case MAKE_ORDER_REQUEST:
      return { ...state, isSaving: true };
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saveError: null,
        data: {
          ...state.data,
          checkedOutOrder: {},
        },
      };
    case CHECKOUT_ORDER:
      return {
        ...state,
        data: {
          ...state.data,
          checkedOutOrder: action.payload.order,
        },
      };
    case UPDATE_ORDER_REQUEST:
      return { ...state, isUpdating: true };
    case UPDATE_ORDER_ERROR:
      return {
        ...state,
        isUpdating: false,
        updateError: action.payload.error,
      };
    case UPDATE_ORDER_SUCCESS: {
      const updatedOrders = produce(state.data.userOrders, (draft) => {
        /* eslint no-param-reassign: 0 */
        draft[draft.findIndex(order => order.id === action.payload.order.id)]
          = action.payload.order;
      });
      return {
        ...state,
        data: {
          userOrders: updatedOrders,
        },
        isUpdating: false,
        updateError: null,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
