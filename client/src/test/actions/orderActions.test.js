import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as orderActions from '../../actions/orderActions';
import * as orderActionTypes from '../../constants/orderActionTypes';
import config from '../../config';
import initialState from '../../reducers/initialState';

describe('order actions', () => {
  localStorage
    .setItem('bamCurrentUser', JSON.stringify({ token: 'testTokendkjiej' }));
  let store;
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  beforeAll(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
  });
  beforeEach(() => {
    store.clearActions();
  });
  it('creates FETCH_USER_ORDERS_SUCCESS when fetchOrders is successful', () => {
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
    const orders = {
      1: { ...order, id: 1 },
      2: { ...order, id: 2 },
    };
    const response = { entities: { orders }, result: [1, 2] };
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders`)
      .reply(200, { orders });

    const expectedActions = [
      { type: orderActionTypes.FETCH_USER_ORDERS_REQUEST },
      { type: orderActionTypes.FETCH_USER_ORDERS_SUCCESS, response },
      { type: 'SET_ORDERS_PAGINATION', links: undefined },
    ];
    return store.dispatch(orderActions
      .fetchUserOrders(`${config.API_BASE_URL}/api/v1/orders`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_USER_ORDERS_ERROR when fetchOrders fails', () => {
    const error = { message: 'Orders not found' };
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders`)
      .reply(404, error);

    const expectedActions = [
      { type: orderActionTypes.FETCH_USER_ORDERS_REQUEST },
      { type: orderActionTypes.FETCH_USER_ORDERS_ERROR, ...error },
    ];
    return store.dispatch(orderActions
      .fetchUserOrders(`${config.API_BASE_URL}/api/v1/orders`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates MAKE_ORDER_SUCCESS when makeOrder is successful', () => {
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
      entities: { orders: { 11: order } },
      result: 11,
    };

    mock.onPost(`${config.API_BASE_URL}/api/v1/orders`)
      .reply(200, { order });

    const expectedActions = [
      { type: orderActionTypes.MAKE_ORDER_REQUEST },
      { type: orderActionTypes.MAKE_ORDER_SUCCESS, response },
    ];
    return store.dispatch(orderActions
      .makeOrder({ mealId: 3, quantity: 1 }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates MAKE_ORDER_ERROR when makeOrder fails', () => {
    const error = { message: 'Meal is not available' };
    mock.onPost(`${config.API_BASE_URL}/api/v1/orders`)
      .reply(404, { message: error.message });

    const expectedActions = [
      { type: orderActionTypes.MAKE_ORDER_REQUEST },
      { type: orderActionTypes.MAKE_ORDER_ERROR, message: error.message },
    ];

    return store.dispatch(orderActions
      .makeOrder({ mealId: 2, quantity: 1 }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_ORDER_SUCCESS when updateOrder is successful', () => {
    const order = {
      id: 11,
      quantity: 2,
      total: '8000',
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
      entities: { orders: { 11: order } },
      result: 11,
    };

    mock.onPut(`${config.API_BASE_URL}/api/v1/orders/1`)
      .reply(200, { order });

    const expectedActions = [
      { type: orderActionTypes.UPDATE_ORDER_REQUEST },
      { type: orderActionTypes.UPDATE_ORDER_SUCCESS, response },
    ];
    return store.dispatch(orderActions
      .updateOrder({ mealId: 3, quantity: 2 }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_ORDER_ERROR when updateOrder fails', () => {
    const error = { message: 'Meal does is not available' };
    mock.onPut(`${config.API_BASE_URL}/api/v1/orders/1`)
      .reply(404, { message: error.message });

    const expectedActions = [
      { type: orderActionTypes.UPDATE_ORDER_REQUEST },
      { type: orderActionTypes.UPDATE_ORDER_ERROR, message: error.message },
    ];

    return store.dispatch(orderActions
      .updateOrder({ mealId: 2, quantity: 1 }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates DELETE_ORDER_SUCCESS when deleteOrder is successful', () => {
    mock.onDelete(`${config.API_BASE_URL}/api/v1/orders/1`)
      .reply(200, { message: 'Successfully deleted order' });

    const expectedActions = [
      { type: orderActionTypes.DELETE_ORDER_REQUEST },
      { type: orderActionTypes.DELETE_ORDER_SUCCESS, payload: { id: 1 } },
    ];
    return store.dispatch(orderActions.deleteOrder(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates DELETE_ORDER_ERROR when deleteOrder fails', () => {
    const error = { message: 'Order does not exist' };
    mock.onDelete(`${config.API_BASE_URL}/api/v1/orders/1`)
      .reply(404, error);

    const expectedActions = [
      { type: orderActionTypes.DELETE_ORDER_REQUEST },
      {
        type: orderActionTypes.DELETE_ORDER_ERROR,
        payload: { error: error.message },
      },
    ];
    return store.dispatch(orderActions.deleteOrder(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should create an action to checkout order', () => {
    const order = {
      amount: '4000',
      mealId: 3,
      name: 'Amala and Ewedu',
      quantity: 1,
      total: 4000,
    };
    const expectedAction = {
      type: orderActionTypes.CHECKOUT_ORDER,
      response: order,
    };
    expect(orderActions.checkoutOrder(order)).toEqual(expectedAction);
  });
});
