import initialState from '../../reducers/initialState';
import reducer, { getOrders } from '../../reducers/orderReducer';
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
} from '../../constants/orderActionTypes';

describe('order reducer', () => {
  const order = {
    id: 11,
    quantity: 1,
    total: '4000',
    status: 'delivered',
    expired: false,
    mealId: 3,
    userId: 4,
    meal: {
      id: 3,
      name: 'Amala and Ewedu',
      price: '4000',
    },
    user: {
      id: 4,
      name: 'Chinonso Okorie',
    },
  };
  const response = {
    entities: {
      orders: { 1: order },
    },
    result: 1,
  };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.orders);
  });
  it('should handle FETCH_USER_ORDERS_REQUEST', () => {
    expect(reducer(initialState.orders, { type: FETCH_USER_ORDERS_REQUEST }))
      .toEqual({ ...initialState.orders, isFetching: true });
  });
  it('should handle MAKE_ORDER_REQUEST', () => {
    expect(reducer(initialState.orders, { type: MAKE_ORDER_REQUEST }))
      .toEqual({ ...initialState.orders, isSaving: true });
  });
  it('should handle UPDATE_ORDER_REQUEST', () => {
    expect(reducer(initialState.orders, { type: UPDATE_ORDER_REQUEST }))
      .toEqual({ ...initialState.orders, isUpdating: true });
  });
  it('should handle FETCH_USER_ORDERS_SUCCESS', () => {
    expect(reducer(initialState.orders, {
      type: FETCH_USER_ORDERS_SUCCESS,
      response,
    })).toEqual({
      ...initialState.orders,
      byId: response.entities.orders,
      allIds: response.result,
    });
  });
  it('should handle UPDATE_ORDER_SUCCESS', () => {
    const state = { ...initialState.orders, allIds: [response.result] };
    expect(reducer(state, {
      type: UPDATE_ORDER_SUCCESS,
      response,
    })).toEqual({
      ...initialState.orders,
      byId: response.entities.orders,
      allIds: [response.result],
    });
  });
  it('should handle MAKE_ORDER_SUCCESS', () => {
    expect(reducer(initialState.orders, {
      type: MAKE_ORDER_SUCCESS,
      response,
    })).toEqual({
      ...initialState.orders,
      byId: response.entities.orders,
      allIds: [response.result],
    });
  });
  it('should handle FETCH_USER_ORDERS_ERROR', () => {
    expect(reducer(initialState.orders, {
      type: FETCH_USER_ORDERS_ERROR,
      message: 'Error fetching user orders',
    })).toEqual({
      ...initialState.orders,
      fetchError: 'Error fetching user orders',
    });
  });
  it('should handle MAKE_ORDER_ERROR', () => {
    expect(reducer(initialState.orders, {
      type: MAKE_ORDER_ERROR,
      message: 'Error saving order',
    })).toEqual({
      ...initialState.orders,
      saveError: 'Error saving order',
    });
  });
  it('should handle UPDATE_ORDER_ERROR', () => {
    expect(reducer(initialState.orders, {
      type: UPDATE_ORDER_ERROR,
      message: 'Error updating order',
    })).toEqual({
      ...initialState.orders,
      updateError: 'Error updating order',
    });
  });
  it('should handle CHECKOUT_ORDER', () => {
    expect(reducer(initialState.orders, {
      type: CHECKOUT_ORDER,
      response: {
        amount: '4000',
        mealId: 3,
        name: 'Amala and Ewedu',
        quantity: 1,
        total: 4000,
      },
    })).toEqual({
      ...initialState.orders,
      checkedOutOrder: {
        amount: '4000',
        mealId: 3,
        name: 'Amala and Ewedu',
        quantity: 1,
        total: 4000,
      },
    });
  });
  it('should return orders when "getOrders" is called', () => {
    const state = {
      byId: response.entities.orders,
      allIds: [response.result],
    };
    expect(getOrders(state)).toEqual([order]);
  });
});
