import initialState from '../../reducers/initialState';
import {
  FETCH_MEALS_REQUEST,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR,
  ADD_MEAL_ERROR,
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  UPDATE_MEAL_REQUEST,
  UPDATE_MEAL_ERROR,
  UPDATE_MEAL_SUCCESS,
  DELETE_MEAL_ERROR,
  DELETE_MEAL_REQUEST,
  DELETE_MEAL_SUCCESS,
} from '../../constants/mealActionTypes';
import reducer, { getMeals } from '../../reducers/mealReducer';


describe('meal reducer', () => {
  const response = {
    entities: {
      meals: {
        1: { id: 1, name: 'meal name' },
        2: { id: 2, name: 'meal name2' },
      },
    },
    result: [1, 2],
  };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.meals);
  });
  it('should handle FETCH_MEALS_SUCCESS', () => {
    expect(reducer(initialState.meals, {
      type: FETCH_MEALS_SUCCESS, response,
    })).toEqual({
      ...initialState.meals,
      byId: {
        1: response.entities.meals['1'],
        2: response.entities.meals['2'],
      },
      allIds: response.result,
    });
  });
  it('should handle FETCH_MEALS_REQUEST', () => {
    expect(reducer(initialState.meals, { type: FETCH_MEALS_REQUEST }))
      .toEqual({
        ...initialState.meals, isFetching: true,
      });
  });
  it('should handle FETCH_MEALS_REQUEST_ERROR', () => {
    expect(reducer(initialState.meals, {
      type: FETCH_MEALS_ERROR,
      message: 'Error fetching meals',
    })).toEqual({
      ...initialState.meals, fetchError: 'Error fetching meals',
    });
  });
  it('should handle ADD_MEAL_SUCCESS', () => {
    expect(reducer(initialState.meals, {
      type: ADD_MEAL_SUCCESS,
      response: {
        entities: {
          meals: { 1: response.entities.meals['1'] },
        },
        result: 1,
      },
    })).toEqual({
      ...initialState.meals,
      byId: {
        1: response.entities.meals['1'],
      },
      allIds: [response.result[0]],
    });
  });
  it('should handle ADD_MEAL_REQUEST', () => {
    expect(reducer(initialState.meals, { type: ADD_MEAL_REQUEST }))
      .toEqual({ ...initialState.meals, isSaving: true });
  });
  it('should handle ADD_MEAL_ERROR', () => {
    expect(reducer(initialState.meals, {
      type: ADD_MEAL_ERROR,
      message: 'Error saving meal',
    }))
      .toEqual({ ...initialState.meals, saveError: 'Error saving meal' });
  });
  it('should handle UPDATE_MEAL_SUCCESS', () => {
    const state = initialState.meals;
    state.allIds = [1, 2];
    state.byId = response.entities.meals;
    expect(reducer(state, {
      type: UPDATE_MEAL_SUCCESS,
      response: {
        entities: {
          meals: { 1: response.entities.meals['1'] },
        },
        result: 1,
      },
    })).toEqual({
      ...initialState.meals,
      byId: {
        1: response.entities.meals['1'],
        2: response.entities.meals['2'],
      },
      allIds: [2, 1],
    });
  });
  it('should handle UPDATE_MEAL_REQUEST', () => {
    expect(reducer(initialState.meals, { type: UPDATE_MEAL_REQUEST }))
      .toEqual({ ...initialState.meals, isUpdating: true });
  });
  it('should handle UPDATE_MEAL_ERROR', () => {
    expect(reducer(initialState.meals, {
      type: UPDATE_MEAL_ERROR,
      message: 'Error updating meal',
    }))
      .toEqual({ ...initialState.meals, updateError: 'Error updating meal' });
  });
  it('should handle DELETE_MEAL_REQUEST', () => {
    expect(reducer(initialState.meals, { type: DELETE_MEAL_REQUEST }))
      .toEqual({ ...initialState.meals, isDeleting: true });
  });
  it('should handle DELETE_MEAL_ERROR', () => {
    expect(reducer(initialState.meals, {
      type: DELETE_MEAL_ERROR,
      message: 'Error deleting meal',
    }))
      .toEqual({ ...initialState.meals, deleteError: 'Error deleting meal' });
  });
  it('should handle DELETE_MEAL_SUCCESS', () => {
    const state = { byId: response.entities.meals, allIds: response.result };
    expect(reducer(state, {
      type: DELETE_MEAL_SUCCESS,
      response: {
        entities: { meals: { 1: { id: 1 } } },
        result: 1,
      },
    })).toEqual({
      ...initialState.meals,
      byId: { 2: response.entities.meals['2'] },
      allIds: [2],
    });
  });
  it('should return all meals when getMeals selector is called', () => {
    const state = { byId: response.entities.meals, allIds: response.result };
    expect(getMeals(state)).toEqual([
      response.entities.meals['1'],
      response.entities.meals['2'],
    ]);
  });
});
