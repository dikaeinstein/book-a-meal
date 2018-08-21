import config from '../config';
import mealService from '../helpers/mealService';
import transformError from '../helpers/transformError';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
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

/**
 * Add meal success action creator
 *
 * @param {object} meal Meal object
 *
 * @returns {object} Redux action
 */
export const addMealSuccess = meal => ({
  type: ADD_MEAL_SUCCESS,
  id: meal.id,
  payload: { meal },
});

/**
 * Add meal error action creator
 *
 * @param {object} error Meal object
 *
 * @returns {object} Redux action
 */
export const addMealError = error => ({
  type: ADD_MEAL_ERROR,
  payload: { error },
});

/**
 * Add meal async action creator
 *
 * @param {object} values Form values
 * @param {object} actions
 *
 * @returns {Function} Async function
 */
export const addMeal = (values, actions) => async (dispatch) => {
  const { setSubmitting, setErrors } = actions;
  try {
    dispatch({ type: ADD_MEAL_REQUEST });
    const meal = await mealService
      .addMeal(`${config.API_BASE_URL}/api/v1/meals`, values);
    dispatch(addMealSuccess(meal));
  } catch (error) {
    setSubmitting(false);
    setErrors({
      addMeal: transformError(
        error,
        'Error saving meal, Please try again',
      ),
    });
    dispatch(axiosErrorWrapper(addMealError(error)));
  }
};

/**
 * Fetch meal error action creator
 *
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const fetchMealsError = error => ({
  type: FETCH_MEALS_ERROR,
  payload: { error },
});

/**
 * Fetch meal success action creator
 *
 * @param {Number} id Meal id
 *
 * @returns {object} Redux action
 */
export const fetchMealsSuccess = meals => ({
  type: FETCH_MEALS_SUCCESS,
  payload: { meals },
});

/**
 * Fetch meal async action creator
 *
 * @returns {Function} Async function
 */
export const fetchMeals = () => async (dispatch) => {
  dispatch({ type: FETCH_MEALS_REQUEST });
  try {
    const meals = await mealService
      .getMeals('/api/v1/meals');
    dispatch(fetchMealsSuccess(meals));
  } catch (error) {
    dispatch(fetchMealsError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Fetch caterer meal async action creator
 *
 * @returns {Function} Async function
 */
export const fetchCatererMeals = () => async (dispatch) => {
  dispatch({ type: FETCH_MEALS_REQUEST });
  try {
    const meals = await mealService
      .getMeals('/api/v1/meals/caterers');
    dispatch(fetchMealsSuccess(meals));
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
 * @param {Number} id Meal id
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
 * @param {object} actions 
 * @param {Number} id Id of meal to update
 *
 * @returns {Function} Async function
 */
export const updateMeal = (values, actions, id) => async (dispatch) => {
  const { setSubmitting, setErrors } = actions;
  dispatch({ type: UPDATE_MEAL_REQUEST });
  try {
    const meal = await mealService
      .updateMeal(`${config.API_BASE_URL}/api/v1/meals/${id}`, values);
    dispatch(updateMealSuccess(meal));
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
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const deleteMealError = error => ({
  type: DELETE_MEAL_ERROR,
  payload: { error },
});

/**
 * Delete meal action creator
 *
 * @param {Number} id Meal id
 *
 * @returns {object} Redux action
 */
export const deleteMealSuccess = id => ({
  type: DELETE_MEAL_SUCCESS,
  id,
});

/**
 * Delete meal async action creator
 *
 * @param {Number} id Meal id
 *
 * @returns {Function} Async function
 */
export const deleteMeal = id => async (dispatch) => {
  dispatch({ type: DELETE_MEAL_REQUEST });
  try {
    await mealService
      .deleteMeal(`${config.API_BASE_URL}/api/v1/meals/${id}`);
    dispatch(deleteMealSuccess(id));
  } catch (error) {
    dispatch(deleteMealError(transformError(
      axiosErrorWrapper(error, dispatch),
      'Error deleting meal, please try again',
    )));
  }
};
