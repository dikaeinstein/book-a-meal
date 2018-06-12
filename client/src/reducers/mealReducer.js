import initialState from './initialState';
import {
  FETCH_MEALS_REQUEST,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR,
  ADD_MEAL_ERROR,
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
} from '../constants/actionTypes';

const mealReducer = (state = initialState.meals, action) => {
  switch (action.type) {
    case FETCH_MEALS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_MEALS_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case FETCH_MEALS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.meals,
        error: null,
      };
    case ADD_MEAL_ERROR:
      return { ...state, isSaving: false, error: action.payload.error };
    case ADD_MEAL_REQUEST:
      return { ...state, isSaving: true };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        isSaving: false,
        data: [...state.data, action.payload.meal],
        error: null,
      };
    default:
      return state;
  }
};

export default mealReducer;
