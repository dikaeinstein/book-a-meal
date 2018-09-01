import { combineReducers } from 'redux';
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


const byId = (state = initialState.orders.byId, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_SUCCESS:
    case MAKE_ORDER_SUCCESS:
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        ...action.response.entities.orders,
      };
    default:
      return state;
  }
};

const allIds = (state = initialState.orders.allIds, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_SUCCESS:
      return action.response.result;
    case MAKE_ORDER_SUCCESS:
      return [...state, action.response.result];
    case UPDATE_ORDER_SUCCESS: {
      const newIds = state.filter(id => id !== action.response.result);
      return [action.response.result, ...newIds].sort((a, b) => b - a);
    }
    default:
      return state;
  }
};

const isFetching = (state = initialState.orders.isFetching, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return true;
    case FETCH_USER_ORDERS_ERROR:
    case FETCH_USER_ORDERS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isSaving = (state = initialState.orders.isSaving, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST:
      return true;
    case MAKE_ORDER_ERROR:
    case MAKE_ORDER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isUpdating = (state = initialState.orders.isUpdating, action) => {
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

const saveError = (state = initialState.orders.saveError, action) => {
  switch (action.type) {
    case MAKE_ORDER_ERROR:
      return action.message;
    default:
      return state;
  }
};

const updateError = (state = initialState.orders.updateError, action) => {
  switch (action.type) {
    case UPDATE_ORDER_ERROR:
      return action.message;
    default:
      return state;
  }
};

const fetchError = (state = initialState.orders.fetchError, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_ERROR:
      return action.message;
    default:
      return state;
  }
};

const checkedOutOrder = (state = initialState.orders.checkedOutOrder, action) => {
  switch (action.type) {
    case CHECKOUT_ORDER:
      return action.response;
    default:
      return state;
  }
};

export const getOrders = state =>
  state.allIds.map(id => state.byId[id]);

const orderReducer = combineReducers({
  byId,
  allIds,
  isFetching,
  isSaving,
  isUpdating,
  fetchError,
  saveError,
  updateError,
  checkedOutOrder,
});

export default orderReducer;
