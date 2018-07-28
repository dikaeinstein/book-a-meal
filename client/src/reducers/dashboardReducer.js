import produce from 'immer';
import {
  GET_TOTAL_ORDERS_ERROR,
  GET_TOTAL_ORDERS_REQUEST,
  GET_TOTAL_ORDERS_SUCCESS,
  GET_TOTAL_AMOUNT_ERROR,
  GET_TOTAL_AMOUNT_REQUEST,
  GET_TOTAL_AMOUNT_SUCCESS,
  FETCH_ALL_ORDERS_ERROR,
  FETCH_ALL_ORDERS_REQUEST,
  FETCH_ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
} from '../constants/orderActionTypes';
import initialState from './initialState';

const dashboardReducer = (state = initialState.dashboard, action) => {
  switch (action.type) {
    case GET_TOTAL_ORDERS_REQUEST:
      return { ...state, isFetchingTotalOrders: true };
    case GET_TOTAL_ORDERS_ERROR:
      return {
        ...state,
        fetchTotalOrdersError: action.payload.error,
        isFetchingTotalOrders: false,
      };
    case GET_TOTAL_ORDERS_SUCCESS:
      return {
        ...state,
        totalOrders: action.payload.totalOrders,
        fetchTotalOrdersError: null,
        isFetchingTotalOrders: false,
      };
    case GET_TOTAL_AMOUNT_REQUEST:
      return { ...state, isFetchingTotalAmount: true };
    case GET_TOTAL_AMOUNT_ERROR:
      return {
        ...state,
        fetchTotalAmountError: action.payload.error,
        isFetchingTotalAmount: false,
      };
    case GET_TOTAL_AMOUNT_SUCCESS:
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
        fetchTotalAmountError: null,
        isFetchingTotalAmount: false,
      };
    case FETCH_ALL_ORDERS_REQUEST:
      return { ...state, fetchAllOrders: true };
    case FETCH_ALL_ORDERS_ERROR:
      return {
        ...state,
        fetchAllOrdersError: action.payload.error,
        isFetchingAllOrders: false,
      };
    case FETCH_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        fetchAllOrdersError: null,
        isFetchingAllOrders: false,
        allOrders: action.payload.orders,
      };
    case UPDATE_ORDER_REQUEST:
      return { ...state, isUpdating: true };
    case UPDATE_ORDER_ERROR:
      return {
        ...state,
        isUpdating: false,
        updateOrderError: action.payload.error,
      };
    case UPDATE_ORDER_SUCCESS: {
      const updatedOrders = produce(state.allOrders, (draft) => {
        /* eslint no-param-reassign: 0 */
        draft[draft.findIndex(order => order.id === action.payload.order.id)]
          = action.payload.order;
      });
      return {
        ...state,
        allOrders: updatedOrders,
        isUpdating: false,
        updateOrderError: null,
      };
    }
    case DELETE_ORDER_REQUEST:
      return { ...state, isDeleting: true };
    case DELETE_ORDER_ERROR:
      return {
        ...state,
        isDeleting: false,
        deleteOrderError: action.payload.error,
      };
    case DELETE_ORDER_SUCCESS: {
      const remainingOrders = produce(state.allOrders, (draft) => {
        draft.splice(draft.findIndex(order => order.id === action.payload.id));
      });
      return {
        ...state,
        allOrders: remainingOrders,
        isDeleting: false,
        deleteOrderError: null,
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
