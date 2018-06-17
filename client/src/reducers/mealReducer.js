import produce from 'immer';
import initialState from './initialState';
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
} from '../constants/mealActionTypes';

const mealReducer = (state = initialState.meals, action) => {
  switch (action.type) {
    case FETCH_MEALS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_MEALS_ERROR:
      return { ...state, isFetching: false, fetchError: action.payload.error };
    case FETCH_MEALS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.meals,
        fetchError: null,
      };
    case ADD_MEAL_ERROR:
      return {
        ...state,
        isSaving: false,
        saveError: action.payload.error,
      };
    case ADD_MEAL_REQUEST:
      return { ...state, isSaving: true };
    case ADD_MEAL_SUCCESS: {
      const addedMeals = produce(state.data, (draft) => {
        draft.push(action.payload.meal);
      });
      return {
        ...state,
        isSaving: false,
        data: addedMeals,
        saveError: null,
      };
    }
    case UPDATE_MEAL_REQUEST:
      return { ...state, isUpdating: true, updateError: false };
    case UPDATE_MEAL_ERROR:
      return {
        ...state,
        isUpdating: false,
        updateError: action.payload.error,
      };
    case UPDATE_MEAL_SUCCESS: {
      const updatedMeals = produce(state.data, (draft) => {
        /* eslint no-param-reassign: 0 */
        draft[draft.findIndex(meal => meal.id === action.payload.meal.id)]
          = action.payload.meal;
      });
      return {
        ...state,
        isUpdating: false,
        data: updatedMeals,
        updateError: false,
      };
    }
    case DELETE_MEAL_ERROR:
      return { ...state, isDeleting: false, deleteError: false };
    case DELETE_MEAL_REQUEST:
      return { ...state, isDeleting: true, deleteError: false };
    case DELETE_MEAL_SUCCESS: {
      const remainingMeals = produce(state.data, (draft) => {
        draft.splice(draft.findIndex(meal => action.id === meal.id), 1);
      });
      return {
        ...state,
        isDeleting: false,
        data: remainingMeals,
        deleteError: false,
      };
    }
    default:
      return state;
  }
};

export default mealReducer;
