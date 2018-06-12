import config from '../config';
import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_ERROR,
  FETCH_MEALS_REQUEST,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_ERROR,
} from '../constants/actionTypes';
import mealService from '../helpers/mealService';

export const addMealSuccess = meal => ({
  type: ADD_MEAL_SUCCESS,
  payload: { meal },
});

export const addMealError = error => ({
  type: ADD_MEAL_ERROR,
  payload: { error },
});

export const addMeal = (values, actions) => async (dispatch) => {
  const { setSubmitting } = actions;
  setSubmitting(false);
  try {
    dispatch({ type: ADD_MEAL_REQUEST });
    const meal = await mealService
      .addMeal(`${config.API_BASE_URL}/api/v1/meals`, values);
    dispatch(addMealSuccess(meal));
  } catch (error) {
    setSubmitting(false);
    dispatch(addMealError(error));
  }
};

export const fetchMealsError = error => ({
  type: FETCH_MEALS_ERROR,
  payload: { error },
});

export const fetchMealsSuccess = meals => ({
  type: FETCH_MEALS_SUCCESS,
  payload: { meals },
});

export const fetchMeals = () => async (dispatch) => {
  dispatch({ type: FETCH_MEALS_REQUEST });
  try {
    const meals = await mealService
      .getMeals(`${config.API_BASE_URL}/api/v1/meals`);
    dispatch(fetchMealsSuccess(meals));
  } catch (error) {
    dispatch(fetchMealsError(error));
  }
};
