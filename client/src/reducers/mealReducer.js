import { combineReducers } from 'redux';
import omit from 'lodash.omit';
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


const byId = (state = initialState.meals.byId, action) => {
  switch (action.type) {
    case FETCH_MEALS_SUCCESS:
    case ADD_MEAL_SUCCESS:
    case UPDATE_MEAL_SUCCESS:
      return {
        ...state,
        ...action.response.entities.meals,
      };
    case DELETE_MEAL_SUCCESS:
      return omit(state, [action.response.result]);
    default:
      return state;
  }
};

const allIds = (state = initialState.meals.allIds, action) => {
  switch (action.type) {
    case FETCH_MEALS_SUCCESS:
      return action.response.result;
    case ADD_MEAL_SUCCESS:
    case UPDATE_MEAL_SUCCESS: {
      const newIds = state.filter(id => id !== action.response.result);
      return [action.response.result, ...newIds].sort((a, b) => b - a);
    }
    case DELETE_MEAL_SUCCESS:
      return state.filter(id => id !== action.response.result);
    default:
      return state;
  }
};

const isFetching = (state = initialState.meals.isFetching, action) => {
  switch (action.type) {
    case FETCH_MEALS_REQUEST:
      return true;
    case FETCH_MEALS_ERROR:
    case FETCH_MEALS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isSaving = (state = initialState.meals.isSaving, action) => {
  switch (action.type) {
    case ADD_MEAL_REQUEST:
      return true;
    case ADD_MEAL_ERROR:
    case ADD_MEAL_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isUpdating = (state = initialState.meals.isUpdating, action) => {
  switch (action.type) {
    case UPDATE_MEAL_REQUEST:
      return true;
    case UPDATE_MEAL_ERROR:
    case UPDATE_MEAL_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state = initialState.meals.isDeleting, action) => {
  switch (action.type) {
    case DELETE_MEAL_REQUEST:
      return true;
    case DELETE_MEAL_ERROR:
    case DELETE_MEAL_SUCCESS:
      return false;
    default:
      return state;
  }
};

const saveError = (state = initialState.meals.saveError, action) => {
  switch (action.type) {
    case ADD_MEAL_ERROR:
      return action.message;
    default:
      return state;
  }
};

const updateError = (state = initialState.meals.updateError, action) => {
  switch (action.type) {
    case UPDATE_MEAL_ERROR:
      return action.message;
    default:
      return state;
  }
};

const fetchError = (state = initialState.meals.fetchError, action) => {
  switch (action.type) {
    case FETCH_MEALS_ERROR:
      return action.message;
    default:
      return state;
  }
};

const deleteError = (state = initialState.meals.deleteError, action) => {
  switch (action.type) {
    case DELETE_MEAL_ERROR:
      return action.message;
    default:
      return state;
  }
};

export const getMeals = state =>
  state.allIds.map(id => state.byId[id]);

const mealReducer = combineReducers({
  allIds,
  byId,
  isFetching,
  isSaving,
  isUpdating,
  isDeleting,
  saveError,
  updateError,
  fetchError,
  deleteError,
});

export default mealReducer;
