import { normalize } from 'normalizr';
import config from '../config';
import mealService from '../helpers/mealService';
import transformError from '../helpers/transformError';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
import { mealSchema, mealListSchema } from './schema';
import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_ERROR,
  FETCH_MEALS_REQUEST,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR,
  UPDATE_MEAL_ERROR,
  UPDATE_MEAL_REQUEST,
  UPDATE_MEAL_SUCCESS,
  DELETE_MEAL_ERROR,
  DELETE_MEAL_REQUEST,
  DELETE_MEAL_SUCCESS,
} from '../constants/mealActionTypes';

/* eslint consistent-return: 0 */

/**
 * Add meal success action creator
 *
 * @param {Object} response Normalized meal response
 *
 * @returns {Object} Redux action
 */
export const addMealSuccess = response => ({
  type: ADD_MEAL_SUCCESS,
  response,
});

/**
 * Add meal error action creator
 *
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
export const addMealError = error => ({
  type: ADD_MEAL_ERROR,
  message: error,
});

/**
 * Add meal async action creator
 *
 * @param {Object} values Form values
 * @param {Object} actions
 *
 * @returns {Function} Async function
 */
export const addMeal = (values, actions) => async (dispatch, getState) => {
  // Return early if already saving meal
  if (getState().meals.isSaving) {
    return Promise.resolve();
  }

  const { setSubmitting, setErrors } = actions;
  try {
    dispatch({ type: ADD_MEAL_REQUEST });
    const meal = await mealService
      .addMeal(`${config.API_BASE_URL}/api/v1/meals`, values);
    dispatch(addMealSuccess(normalize(meal, mealSchema)));
  } catch (error) {
    setSubmitting(false);
    setErrors({
      addMeal: transformError(
        error,
        'Error saving meal, Please try again',
      ),
    });
    dispatch(addMealError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Fetch meal error action creator
 *
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
export const fetchMealsError = error => ({
  type: FETCH_MEALS_ERROR,
  message: error,
});

/**
 * Fetch meals success action creator
 *
 * @param {Object} response Normalized meals response
 *
 * @returns {Object} Redux action
 */
export const fetchMealsSuccess = response => ({
  type: FETCH_MEALS_SUCCESS,
  response,
});

/**
 * Fetch meal async action creator
 *
 * @returns {Function} Async function
 */
export const fetchMeals = () => async (dispatch, getState) => {
  // Return early if already fetching meals
  if (getState().meals.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_MEALS_REQUEST });
  try {
    const meals = await mealService
      .getMeals('/api/v1/meals');
    dispatch(fetchMealsSuccess(normalize(meals, mealListSchema)));
  } catch (error) {
    dispatch(fetchMealsError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Fetch caterer meals async action creator
 *
 * @returns {Function} Async function
 */
export const fetchCatererMeals = () => async (dispatch, getState) => {
  // Return early if already fetching meals
  if (getState().meals.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_MEALS_REQUEST });
  try {
    const meals = await mealService
      .getMeals('/api/v1/meals/caterers');
    dispatch(fetchMealsSuccess(normalize(meals, mealListSchema)));
  } catch (error) {
    dispatch(fetchMealsError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Delete meal error action creator
 *
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const updateMealError = error => ({
  type: UPDATE_MEAL_ERROR,
  payload: { error },
});

/**
 * Update meal success action creator
 *
 * @param {Object} response Normalized meal response
 *
 * @returns {object} Redux action
 */
export const updateMealSuccess = meal => ({
  type: UPDATE_MEAL_SUCCESS,
  payload: { meal },
});

/**
 * Update meal async action creator
 *
 * @param {object} values Form values
 * @param {object} actions Form actions
 * @param {Number} id Id of meal to update
 *
 * @returns {Function} Async function
 */
export const updateMeal = (values, actions, id) => async (dispatch, getState) => {
  // Return early if already updating meal
  if (getState().meals.isSaving) {
    return Promise.resolve();
  }

  const { setSubmitting, setErrors } = actions;
  dispatch({ type: UPDATE_MEAL_REQUEST });
  try {
    const meal = await mealService
      .updateMeal(`${config.API_BASE_URL}/api/v1/meals/${id}`, values);
    dispatch(updateMealSuccess(normalize(meal, mealSchema)));
  } catch (error) {
    setSubmitting(false);
    setErrors({
      updateMeal: transformError(
        error,
        'Error updating meal, Please try again',
      ),
    });
    dispatch(updateMealError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Delete meal error action creator
 *
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
export const deleteMealError = error => ({
  type: DELETE_MEAL_ERROR,
  message: error,
});

/**
 * Delete meal action creator
 *
 * @param {Object} response Normalized Meal id response
 *
 * @returns {object} Redux action
 */
export const deleteMealSuccess = response => ({
  type: DELETE_MEAL_SUCCESS,
  response,
});

/**
 * Delete meal async action creator
 *
 * @param {Number} id Meal id
 *
 * @returns {Function} Async function
 */
export const deleteMeal = id => async (dispatch, getState) => {
  // Return early if already fetching meals
  if (getState().meals.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: DELETE_MEAL_REQUEST });
  try {
    await mealService
      .deleteMeal(`${config.API_BASE_URL}/api/v1/meals/${id}`);
    dispatch(deleteMealSuccess(normalize({ id }, mealSchema)));
  } catch (error) {
    dispatch(deleteMealError(transformError(
      axiosErrorWrapper(error, dispatch),
      'Error deleting meal, please try again',
    )));
  }
};

/**
 * Delete caterer meal async action creator
 *
 * @param {Number} id Meal id
 *
 * @returns {Function} Async function
 */
export const deleteCatererMeal = id => async (dispatch, getState) => {
  // Return early if already fetching meals
  if (getState().meals.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: DELETE_MEAL_REQUEST });
  try {
    await mealService
      .deleteMeal(`${config.API_BASE_URL}/api/v1/meals/${id}/users`);
    dispatch(deleteMealSuccess(normalize({ id }, mealSchema)));
  } catch (error) {
    dispatch(deleteMealError(transformError(
      axiosErrorWrapper(error, dispatch),
      'Error deleting meal, please try again',
    )));
  }
};
