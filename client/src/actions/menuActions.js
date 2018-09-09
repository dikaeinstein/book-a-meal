import { normalize } from 'normalizr';
import swal from 'sweetalert';
import menuService from '../helpers/menuService';
import config from '../config';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
import transformError from '../helpers/transformError';
import { menuSchema } from './schema';
import {
  FETCH_MENU_SUCCESS,
  FETCH_MENU_REQUEST,
  FETCH_MENU_ERROR,
  SETUP_MENU_ERROR,
  SETUP_MENU_REQUEST,
  SETUP_MENU_SUCCESS,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_ERROR,
  UPDATE_MENU_SUCCESS,
} from '../constants/menuActionTypes';


/* eslint consistent-return: 0 */

/**
 * Fetch menu success action creator
 *
 * @export
 * @param {Object} response Normalized menu response
 *
 * @returns {Object} Redux action
 */
const fetchMenuSuccess = response => ({
  type: FETCH_MENU_SUCCESS,
  response,
});

/**
 * Fetch menu error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {object} Redux action
 */
const fetchMenuError = error => ({
  type: FETCH_MENU_ERROR,
  message: error,
});

/**
 * Fetch menu async action creator
 *
 * @export
 *
 * @returns {Function}
 */
export const fetchMenu = url => async (dispatch, getState) => {
  if (getState().menu.isFetching) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_MENU_REQUEST });
  try {
    const response = await menuService.getMenu(url);
    dispatch(fetchMenuSuccess(normalize(response.menu, menuSchema)));
    dispatch({ type: 'SET_MENU_PAGINATION', links: response.links });
  } catch (error) {
    dispatch(fetchMenuError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Setup menu success action creator
 *
 * @export
 * @param {Object} response Normalized menu response
 *
 * @returns {Object} Redux action
 */
const setupMenuSuccess = response => ({
  type: SETUP_MENU_SUCCESS,
  response,
});

/**
 * Setup menu error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
const setupMenuError = error => ({
  type: SETUP_MENU_ERROR,
  message: error,
});

/**
 * Setup menu async action creator
 *
 * @export
 * @param {Object} values
 *
 * @returns {Function}
 */
export const setupMenu = values => async (dispatch, getState) => {
  if (getState().menu.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: SETUP_MENU_REQUEST });
  try {
    const menu = await menuService
      .setMenu(`${config.API_BASE_URL}/api/v1/menu/`, values);
    dispatch(setupMenuSuccess(normalize(menu, menuSchema)));
    swal({
      text: 'Successfully setup menu!',
      icon: 'success',
    });
  } catch (error) {
    const normalizedError = axiosErrorWrapper(error, dispatch);
    const defaultErrorMessage = 'Error saving menu, Please try again';
    dispatch(setupMenuError(transformError(
      normalizedError,
      defaultErrorMessage,
    )));
    swal({
      text: typeof normalizedError !== 'string'
        ? defaultErrorMessage : normalizedError,
      icon: 'error',
    });
  }
};

/**
 * Update menu success action creator
 *
 * @export
 * @param {Object} response Normalized menu response
 *
 * @returns {object} Redux action
 */
const updateMenuSuccess = response => ({
  type: UPDATE_MENU_SUCCESS,
  response,
});

/**
 * Update menu error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
const updateMenuError = error => ({
  type: UPDATE_MENU_ERROR,
  message: error,
});

/**
 * Update menu async action creator
 *
 * @export
 * @param {object} values
 * @param {Number} menuId
 *
 * @returns {Function}
 */
export const updateMenu = (values, menuId) => async (dispatch, getState) => {
  if (getState().menu.isUpdating) {
    return Promise.resolve();
  }

  dispatch({ type: UPDATE_MENU_REQUEST });
  try {
    const menu = await menuService
      .updateMenu(`${config.API_BASE_URL}/api/v1/menu/${menuId}`, values);
    dispatch(updateMenuSuccess(normalize(menu, menuSchema)));
    swal({
      text: 'Menu successfully updated!',
      icon: 'success',
    });
  } catch (error) {
    const normalizedError = axiosErrorWrapper(error, dispatch);
    const defaultErrorMessage = 'Error updating menu, Please try again';
    dispatch(updateMenuError(transformError(
      normalizedError,
      defaultErrorMessage,
    )));
    swal({
      text: typeof normalizedError !== 'string'
        ? defaultErrorMessage : normalizedError,
      icon: 'error',
    });
  }
};
