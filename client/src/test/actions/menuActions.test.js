import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as menuActions from '../../actions/menuActions';
import * as menuActionTypes from '../../constants/menuActionTypes';
import config from '../../config';
import initialState from '../../reducers/initialState';

describe('menuActions', () => {
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
  it('creates FETCH_MENU_SUCCESS when fetchMenu is successful', () => {
    const meals = [
      { id: 1, name: 'Test meal1' },
      { id: 2, name: 'Test meal2' },
    ];
    const menu = {
      id: 1,
      name: 'Test menu',
      meals,
    };
    const response = { entities: { menu: { 1: { ...menu } } }, result: 1 };
    mock.onGet(`${config.API_BASE_URL}/api/v1/menu`)
      .reply(200, { menu });
    const expectedActions = [
      { type: menuActionTypes.FETCH_MENU_REQUEST },
      { type: menuActionTypes.FETCH_MENU_SUCCESS, response },
      { type: 'SET_MENU_PAGINATION', links: undefined },
    ];
    return store.dispatch(menuActions
      .fetchMenu(`${config.API_BASE_URL}/api/v1/menu`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates SETUP_MENU_SUCCESS when setupMenu is successful', () => {
    const mealIds = [1, 2];
    const meals = [
      { id: 1, name: 'Test meal1' },
      { id: 2, name: 'Test meal2' },
    ];
    const menu = { name: 'test menu', mealIds };
    const response = {
      entities: {
        menu: { 1: { id: 1, name: menu.name, meals } },
      },
      result: 1,
    };
    mock.onPost(`${config.API_BASE_URL}/api/v1/menu/`)
      .reply(200, { menu: response.entities.menu['1'] });
    const expectedActions = [
      { type: menuActionTypes.SETUP_MENU_REQUEST },
      { type: menuActionTypes.SETUP_MENU_SUCCESS, response },
    ];
    return store.dispatch(menuActions.setupMenu(menu))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_MENU_SUCCESS when updateMenu is successful', () => {
    const mealIds = [1, 2];
    const meals = [
      { id: 1, name: 'Test meal1' },
      { id: 2, name: 'Test meal2' },
    ];
    const menu = { name: 'test menu', mealIds };
    const response = {
      entities: {
        menu: { 1: { id: 1, name: menu.name, meals } },
      },
      result: 1,
    };
    mock.onPut(`${config.API_BASE_URL}/api/v1/menu/1`)
      .reply(200, { menu: response.entities.menu['1'] });
    const expectedActions = [
      { type: menuActionTypes.UPDATE_MENU_REQUEST },
      { type: menuActionTypes.UPDATE_MENU_SUCCESS, response },
    ];
    return store.dispatch(menuActions.updateMenu(menu, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_MENU_ERROR when fetchMenu fails', () => {
    const error = { message: 'Menu not found' };
    mock.onGet(`${config.API_BASE_URL}/api/v1/menu/`)
      .reply(404, error);

    const expectedActions = [
      { type: menuActionTypes.FETCH_MENU_REQUEST },
      { type: menuActionTypes.FETCH_MENU_ERROR, ...error },
    ];

    return store.dispatch(menuActions
      .fetchMenu(`${config.API_BASE_URL}/api/v1/menu/`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates SETUP_MENU_ERROR when fetchMenu fails', () => {
    const error = { message: 'Menu for the day have been set' };
    mock.onPost(`${config.API_BASE_URL}/api/v1/menu/`)
      .reply(409, error);

    const expectedActions = [
      { type: menuActionTypes.SETUP_MENU_REQUEST },
      { type: menuActionTypes.SETUP_MENU_ERROR, ...error },
    ];

    return store.dispatch(menuActions
      .setupMenu(`${config.API_BASE_URL}/api/v1/menu/`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_MENU_ERROR when updateMenu fails', () => {
    const mealIds = [1, 2];
    const menu = { name: 'test menu', mealIds };
    const error = { message: 'Menu does not exist' };
    mock.onPut(`${config.API_BASE_URL}/api/v1/menu/1`)
      .reply(404, error);

    const expectedActions = [
      { type: menuActionTypes.UPDATE_MENU_REQUEST },
      { type: menuActionTypes.UPDATE_MENU_ERROR, ...error },
    ];

    return store.dispatch(menuActions
      .updateMenu(menu, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
