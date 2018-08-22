import { combineReducers } from 'redux';
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
} from '../constants/orderActionTypes';
import initialState from './initialState';

const isUpdating = (state = initialState.dashboard.isUpdating, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return true;
    case UPDATE_ORDER_ERROR:
    case UPDATE_ORDER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isFetchingAllOrders = (
  state = initialState.dashboard.isFetchingAllOrders,
  action,
) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS_REQUEST:
      return true;
    case FETCH_ALL_ORDERS_ERROR:
    case FETCH_ALL_ORDERS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const byId = (state = initialState.dashboard.byId, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS_SUCCESS:
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        ...action.response.entities.orders,
      };
    default:
      return state;
  }
};

const allIds = (state = initialState.dashboard.allIds, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS_SUCCESS:
      return action.response.result;
    case UPDATE_ORDER_SUCCESS:
      return [...state, action.response.result];
    default:
      return state;
  }
};

const fetchAllOrdersError = (
  state = initialState.dashboard.fetchAllOrdersError,
  action,
) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS_ERROR:
      return action.message;
    default:
      return state;
  }
};

const updateOrderError = (
  state = initialState.dashboard.updateOrderError,
  action,
) => {
  switch (action.type) {
    case UPDATE_ORDER_ERROR:
      return action.message;
    default:
      return state;
  }
};

const isFetchingTotalAmount = (
  state = initialState.dashboard.isFetchingTotalAmount,
  action,
) => {
  switch (action.type) {
    case GET_TOTAL_AMOUNT_REQUEST:
      return true;
    case GET_TOTAL_AMOUNT_ERROR:
    case GET_TOTAL_AMOUNT_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isFetchingTotalOrders = (
  state = initialState.dashboard.isFetchingTotalOrders,
  action,
) => {
  switch (action.type) {
    case GET_TOTAL_ORDERS_REQUEST:
      return true;
    case GET_TOTAL_ORDERS_ERROR:
    case GET_TOTAL_ORDERS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const fetchTotalOrdersError = (
  state = initialState.dashboard.fetchTotalOrdersError,
  action,
) => {
  switch (action.type) {
    case GET_TOTAL_ORDERS_ERROR:
      return action.message;
    default:
      return state;
  }
};

const fetchTotalAmountError = (
  state = initialState.dashboard.fetchTotalAmountError,
  action,
) => {
  switch (action.type) {
    case GET_TOTAL_AMOUNT_ERROR:
      return action.message;
    default:
      return state;
  }
};

const totalAmount = (state = initialState.dashboard.totalAmount, action) => {
  switch (action.type) {
    case GET_TOTAL_AMOUNT_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

const totalOrders = (state = initialState.dashboard.totalOrders, action) => {
  switch (action.type) {
    case GET_TOTAL_ORDERS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export const getOrders = state =>
  state.allIds.map(id => state.byId[id]);

const dashboardReducer = combineReducers({
  byId,
  allIds,
  isFetchingAllOrders,
  isFetchingTotalAmount,
  isFetchingTotalOrders,
  isUpdating,
  updateOrderError,
  fetchAllOrdersError,
  fetchTotalAmountError,
  fetchTotalOrdersError,
  totalAmount,
  totalOrders,
});

export default dashboardReducer;
