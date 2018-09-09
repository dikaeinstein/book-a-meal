import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as dashboardActions from '../../actions/dashboardActions';
import * as orderActionTypes from '../../constants/orderActionTypes';
import config from '../../config';
import initialState from '../../reducers/initialState';


describe('dashboard actions', () => {
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
  it('creates FETCH_ALL_ORDERS_SUCCESS when fetchAllOrders is successful', () => {
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
      { type: orderActionTypes.FETCH_ALL_ORDERS_REQUEST },
      { type: orderActionTypes.FETCH_ALL_ORDERS_SUCCESS, response },
      { type: 'SET_DASHBOARD_ORDERS_PAGINATION', links: undefined },
    ];
    return store.dispatch(dashboardActions
      .fetchAllOrders(`${config.API_BASE_URL}/api/v1/orders`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_CATERER_ORDERS_SUCCESS when fetchCatererOrders is successful', () => {
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
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/caterers`)
      .reply(200, { orders });

    const expectedActions = [
      { type: orderActionTypes.FETCH_ALL_ORDERS_REQUEST },
      { type: orderActionTypes.FETCH_ALL_ORDERS_SUCCESS, response },
      { type: 'SET_CATERER_DASHBOARD_ORDERS_PAGINATION', links: undefined },
    ];
    return store.dispatch(dashboardActions
      .fetchCatererOrders(`${config.API_BASE_URL}/api/v1/orders/caterers`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_ALL_ORDERS_ERROR when fetchAllOrders fails', () => {
    const error = { message: 'Orders not found' };
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders`)
      .reply(404, error);

    const expectedActions = [
      { type: orderActionTypes.FETCH_ALL_ORDERS_REQUEST },
      { type: orderActionTypes.FETCH_ALL_ORDERS_ERROR, ...error },
    ];
    return store.dispatch(dashboardActions
      .fetchAllOrders(`${config.API_BASE_URL}/api/v1/orders`))
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
    return store.dispatch(dashboardActions
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

    return store.dispatch(dashboardActions
      .updateOrder({ mealId: 2, quantity: 1 }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates GET_TOTAL_ORDERS_SUCCESS when getTotalOrders is successful', () => {
    const response = 10;
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/totalOrders`)
      .reply(200, { totalOrders: response });

    const expectedActions = [
      { type: orderActionTypes.GET_TOTAL_ORDERS_REQUEST },
      { type: orderActionTypes.GET_TOTAL_ORDERS_SUCCESS, response },
    ];
    return store.dispatch(dashboardActions
      .getTotalOrders(`${config.API_BASE_URL}/api/v1/orders/totalOrders`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates GET_CATERER_TOTAL_ORDERS_SUCCESS when getCatererTotalOrders is successful', () => {
    const response = 10;
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/totalOrders/caterers`)
      .reply(200, { totalOrders: response });

    const expectedActions = [
      { type: orderActionTypes.GET_TOTAL_ORDERS_REQUEST },
      { type: orderActionTypes.GET_TOTAL_ORDERS_SUCCESS, response },
    ];
    return store.dispatch(dashboardActions
      .getCatererTotalOrders(`${config.API_BASE_URL}/api/v1/orders/totalOrders/caterers`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates GET_TOTAL_AMOUNT_SUCCESS when getTotalAmount is successful', () => {
    const response = 100;
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/totalAmount`)
      .reply(200, { totalAmount: response });

    const expectedActions = [
      { type: orderActionTypes.GET_TOTAL_AMOUNT_REQUEST },
      { type: orderActionTypes.GET_TOTAL_AMOUNT_SUCCESS, response },
    ];
    return store.dispatch(dashboardActions
      .getTotalAmount(`${config.API_BASE_URL}/api/v1/orders/totalAmount`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates GET_CATERER_TOTAL_AMOUNT_SUCCESS when getTotalAmount is successful', () => {
    const response = 100;
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/totalAmount/caterers`)
      .reply(200, { totalAmount: response });

    const expectedActions = [
      { type: orderActionTypes.GET_TOTAL_AMOUNT_REQUEST },
      { type: orderActionTypes.GET_TOTAL_AMOUNT_SUCCESS, response },
    ];
    return store.dispatch(dashboardActions
      .getCatererTotalAmount(`${config.API_BASE_URL}/api/v1/orders/totalAmount/caterers`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates GET_TOTAL_ORDERS_ERROR when getTotalOrders fails', () => {
    const message = 'No order have been placed';
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/totalOrders`)
      .reply(404, { message });

    const expectedActions = [
      { type: orderActionTypes.GET_TOTAL_ORDERS_REQUEST },
      { type: orderActionTypes.GET_TOTAL_ORDERS_ERROR, message },
    ];
    return store.dispatch(dashboardActions
      .getTotalOrders(`${config.API_BASE_URL}/api/v1/orders/totalOrders`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates GET_TOTAL_AMOUNT_ERROR when getTotalAmount fails', () => {
    const message = 'No order have been placed';
    mock.onGet(`${config.API_BASE_URL}/api/v1/orders/totalAmount`)
      .reply(404, { message });

    const expectedActions = [
      { type: orderActionTypes.GET_TOTAL_AMOUNT_REQUEST },
      { type: orderActionTypes.GET_TOTAL_AMOUNT_ERROR, message },
    ];
    return store.dispatch(dashboardActions
      .getTotalAmount(`${config.API_BASE_URL}/api/v1/orders/totalAmount`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
