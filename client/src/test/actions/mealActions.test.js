import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as mealActions from '../../actions/mealActions';
import * as mealActionTypes from '../../constants/mealActionTypes';
import config from '../../config';
import initialState from '../../reducers/initialState';

describe('mealActions', () => {
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
  it('creates FETCH_MEALS_SUCCESS when fetchMeals is successful', () => {
    const meals = {
      1: { id: 1, name: 'Test meal1' },
      2: { id: 2, name: 'Test meal2' },
    };
    const response = { entities: { meals }, result: [1, 2] };
    mock.onGet(`${config.API_BASE_URL}/api/v1/meals`)
      .reply(200, { meals });

    const expectedActions = [
      { type: mealActionTypes.FETCH_MEALS_REQUEST },
      { type: mealActionTypes.FETCH_MEALS_SUCCESS, response },
      { type: 'SET_MEALS_PAGINATION', links: undefined },
    ];
    return store.dispatch(mealActions
      .fetchMeals(`${config.API_BASE_URL}/api/v1/meals`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_MEALS_SUCCESS when fetchCatererMeals is successful', () => {
    const meals = {
      1: { id: 1, name: 'Test meal1' },
      2: { id: 2, name: 'Test meal2' },
    };
    const response = { entities: { meals }, result: [1, 2] };
    mock.onGet(`${config.API_BASE_URL}/api/v1/meals/caterers`)
      .reply(200, { meals });

    const expectedActions = [
      { type: mealActionTypes.FETCH_MEALS_REQUEST },
      { type: mealActionTypes.FETCH_MEALS_SUCCESS, response },
      { type: 'SET_CATERER_MEALS_PAGINATION', links: undefined },
    ];
    return store.dispatch(mealActions
      .fetchCatererMeals(`${config.API_BASE_URL}/api/v1/meals/caterers`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_MEALS_ERROR when fetchMeals fails', () => {
    const error = { message: 'Meals not found' };
    mock.onGet(`${config.API_BASE_URL}/api/v1/meals`)
      .reply(404, error);

    const expectedActions = [
      { type: mealActionTypes.FETCH_MEALS_REQUEST },
      { type: mealActionTypes.FETCH_MEALS_ERROR, ...error },
    ];
    return store.dispatch(mealActions
      .fetchMeals(`${config.API_BASE_URL}/api/v1/meals`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates FETCH_CATERER_MEALS_ERROR when fetchCatererMeals fails', () => {
    const error = { message: 'Meals not found' };
    mock.onGet(`${config.API_BASE_URL}/api/v1/meals/caterers`)
      .reply(404, error);

    const expectedActions = [
      { type: mealActionTypes.FETCH_MEALS_REQUEST },
      { type: mealActionTypes.FETCH_MEALS_ERROR, ...error },
    ];
    return store.dispatch(mealActions
      .fetchCatererMeals(`${config.API_BASE_URL}/api/v1/meals/caterers`))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates ADD_MEAL_SUCCESS when addMeal is successful', () => {
    const meal = {
      name: 'Test meal',
      description: 'This is a test meal',
      price: 5000,
      imageUrl: 'http://testurl.com',
    };
    const response = {
      entities: { meals: { 1: { id: 1, ...meal } } },
      result: 1,
    };

    mock.onPost(`${config.API_BASE_URL}/api/v1/meals`)
      .reply(200, { meal: { id: 1, ...meal } });

    const expectedActions = [
      { type: mealActionTypes.ADD_MEAL_REQUEST },
      { type: mealActionTypes.ADD_MEAL_SUCCESS, response },
    ];
    return store.dispatch(mealActions
      .addMeal(meal, { setSubmitting: jest.fn, setErrors: jest.fn }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates ADD_MEAL_ERROR when addMeal fails', () => {
    const meal = {
      name: 'Test meal',
      description: 'This is a test meal',
      price: 5000,
      imageUrl: 'http://testurl.com',
    };
    const error = { message: 'Meal name already exist' };
    mock.onPost(`${config.API_BASE_URL}/api/v1/meals`)
      .reply(409, { message: 'Meal name already exist' });

    const expectedActions = [
      { type: mealActionTypes.ADD_MEAL_REQUEST },
      { type: mealActionTypes.ADD_MEAL_ERROR, ...error },
    ];
    return store.dispatch(mealActions
      .addMeal(meal, { setSubmitting: jest.fn, setErrors: jest.fn }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_MEAL_SUCCESS when updateMeal is successful', () => {
    const meal = {
      name: 'Test meal',
      description: 'This is a test meal',
      price: 5000,
      imageUrl: 'http://testurl.com',
    };
    const response = {
      entities: { meals: { 1: { id: 1, ...meal } } },
      result: 1,
    };

    mock.onPut(`${config.API_BASE_URL}/api/v1/meals/1`)
      .reply(200, { meal: { id: 1, ...meal } });

    const expectedActions = [
      { type: mealActionTypes.UPDATE_MEAL_REQUEST },
      { type: mealActionTypes.UPDATE_MEAL_SUCCESS, response },
    ];
    return store.dispatch(mealActions
      .updateMeal(meal, { setSubmitting: jest.fn, setErrors: jest.fn }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates UPDATE_MEAL_ERROR when updateMeal fails', () => {
    const meal = {
      name: 'Test meal',
      description: 'This is a test meal',
      price: 5000,
      imageUrl: 'http://testurl.com',
    };
    const error = { message: 'Meal name already exist' };
    mock.onPut(`${config.API_BASE_URL}/api/v1/meals/1`)
      .reply(409, { message: 'Meal name already exist' });

    const expectedActions = [
      { type: mealActionTypes.UPDATE_MEAL_REQUEST },
      { type: mealActionTypes.UPDATE_MEAL_ERROR, ...error },
    ];
    return store.dispatch(mealActions
      .updateMeal(meal, { setSubmitting: jest.fn, setErrors: jest.fn }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates DELETE_MEAL_SUCCESS when deleteMeal is successful', () => {
    const response = {
      entities: { meals: { 1: { id: 1 } } },
      result: 1,
    };

    mock.onDelete(`${config.API_BASE_URL}/api/v1/meals/1`)
      .reply(200, { message: 'Successfully deleted meal' });

    const expectedActions = [
      { type: mealActionTypes.DELETE_MEAL_REQUEST },
      { type: mealActionTypes.DELETE_MEAL_SUCCESS, response },
    ];
    return store.dispatch(mealActions.deleteMeal(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates DELETE_MEAL_SUCCESS when deleteCatererMeal is successful', () => {
    const response = {
      entities: { meals: { 1: { id: 1 } } },
      result: 1,
    };

    mock.onDelete(`${config.API_BASE_URL}/api/v1/meals/1/users`)
      .reply(200, { message: 'Successfully deleted meal' });

    const expectedActions = [
      { type: mealActionTypes.DELETE_MEAL_REQUEST },
      { type: mealActionTypes.DELETE_MEAL_SUCCESS, response },
    ];
    return store.dispatch(mealActions.deleteCatererMeal(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates DELETE_MEAL_ERROR when deleteMeal fails', () => {
    const error = { message: 'Meal does not exist' };
    mock.onDelete(`${config.API_BASE_URL}/api/v1/meals/1`)
      .reply(404, error);

    const expectedActions = [
      { type: mealActionTypes.DELETE_MEAL_REQUEST },
      { type: mealActionTypes.DELETE_MEAL_ERROR, ...error },
    ];
    return store.dispatch(mealActions.deleteMeal(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates DELETE_MEAL_ERROR when deleteCatererMeal fails', () => {
    const error = { message: 'Meal does not exist' };
    mock.onDelete(`${config.API_BASE_URL}/api/v1/meals/1/users`)
      .reply(404, error);

    const expectedActions = [
      { type: mealActionTypes.DELETE_MEAL_REQUEST },
      { type: mealActionTypes.DELETE_MEAL_ERROR, ...error },
    ];
    return store.dispatch(mealActions.deleteCatererMeal(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
