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
} from '../../constants/orderActionTypes';
import initialState from '../../reducers/initialState';
import reducer, { getOrders } from '../../reducers/dashboardReducer';

describe('dashboard reducer', () => {
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
    expect(reducer(undefined, {})).toEqual(initialState.dashboard);
  });
  it('should handle FETCH_ALL_ORDERS_REQUEST', () => {
    expect(reducer(initialState.dashboard, { type: FETCH_ALL_ORDERS_REQUEST }))
      .toEqual({ ...initialState.dashboard, isFetchingAllOrders: true });
  });
  it('should handle FETCH_ALL_ORDERS_ERROR', () => {
    expect(reducer(initialState.dashboard, {
      type: FETCH_ALL_ORDERS_ERROR,
      message: 'Error fetching orders',
    })).toEqual({
      ...initialState.dashboard,
      fetchAllOrdersError: 'Error fetching orders',
    });
  });
  it('should handle FETCH_ALL_ORDERS_SUCCESS', () => {
    expect(reducer(initialState.dashboard, {
      type: FETCH_ALL_ORDERS_SUCCESS,
      response,
    })).toEqual({
      ...initialState.dashboard,
      byId: response.entities.orders,
      allIds: response.result,
    });
  });
  it('should handle UPDATE_ORDER_REQUEST', () => {
    expect(reducer(initialState.dashboard, { type: UPDATE_ORDER_REQUEST }))
      .toEqual({ ...initialState.dashboard, isUpdating: true });
  });
  it('should handle UPDATE_ORDER_SUCCESS', () => {
    const state = {
      ...initialState.dashboard,
      byId: response.entities.orders,
      allIds: [response.result],
    };
    expect(reducer(state, {
      type: UPDATE_ORDER_SUCCESS,
      response,
    })).toEqual({
      ...initialState.dashboard,
      byId: response.entities.orders,
      allIds: [response.result],
    });
  });
  it('should handle UPDATE_ORDER_ERROR', () => {
    expect(reducer(initialState.dashboard, {
      type: UPDATE_ORDER_ERROR,
      message: 'Error updating order',
    })).toEqual({
      ...initialState.dashboard,
      updateOrderError: 'Error updating order',
    });
  });
  it('should handle GET_TOTAL_ORDERS_REQUEST', () => {
    expect(reducer(initialState.dashboard, {
      type: GET_TOTAL_ORDERS_REQUEST,
    })).toEqual({
      ...initialState.dashboard,
      isFetchingTotalOrders: true,
    });
  });
  it('should handle GET_TOTAL_AMOUNT_REQUEST', () => {
    expect(reducer(initialState.dashboard, {
      type: GET_TOTAL_AMOUNT_REQUEST,
    })).toEqual({
      ...initialState.dashboard,
      isFetchingTotalAmount: true,
    });
  });
  it('should handle GET_TOTAL_ORDERS_SUCCESS', () => {
    expect(reducer(initialState.dashboard, {
      type: GET_TOTAL_ORDERS_SUCCESS,
      response: 10,
    })).toEqual({
      ...initialState.dashboard,
      totalOrders: 10,
    });
  });
  it('should handle GET_TOTAL_AMOUNT_SUCCESS', () => {
    expect(reducer(initialState.dashboard, {
      type: GET_TOTAL_AMOUNT_SUCCESS,
      response: 100,
    })).toEqual({
      ...initialState.dashboard,
      totalAmount: 100,
    });
  });
  it('should handle GET_TOTAL_ORDERS_ERROR', () => {
    expect(reducer(initialState.dashboard, {
      type: GET_TOTAL_ORDERS_ERROR,
      message: 'Error fetching total orders',
    })).toEqual({
      ...initialState.dashboard,
      fetchTotalOrdersError: 'Error fetching total orders',
    });
  });
  it('should handle GET_TOTAL_AMOUNT_ERROR', () => {
    expect(reducer(initialState.dashboard, {
      type: GET_TOTAL_AMOUNT_ERROR,
      message: 'Error fetching total amount',
    })).toEqual({
      ...initialState.dashboard,
      fetchTotalAmountError: 'Error fetching total amount',
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
