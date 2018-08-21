import menuService from '../helpers/menuService';
import config from '../config';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
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
 * @param {object} menu
 *
 * @returns {object} Redux action
 */
const fetchMenuSuccess = menu => ({
  type: FETCH_MENU_SUCCESS,
  payload: { menu },
});

/**
 * Fetch menu error action creator
 *
 * @export
 * @param {*} error
 *
 * @returns {object} Redux action
 */
const fetchMenuError = error => ({
  type: FETCH_MENU_ERROR,
  payload: { error },
});

/**
 * Fetch menu async action creator
 *
 * @export
 *
 * @returns {Function}
 */
export const fetchMenu = () => async (dispatch, getState) => {
  if (getState().menus.isFetching) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_MENU_REQUEST });
  try {
    const menu = await menuService.getMenu(`${config.API_BASE_URL}/api/v1/menu/`);
    dispatch(fetchMenuSuccess(menu));
  } catch (error) {
    dispatch(fetchMenuError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Setup menu success action creator
 *
 * @export
 * @param {object} menu
 *
 * @returns {object} Redux action
 */
const setupMenuSuccess = menu => ({
  type: SETUP_MENU_SUCCESS,
  payload: { menu },
});

/**
 * Setup menu error action creator
 *
 * @export
 * @param {*} error
 *
 * @returns {object} Redux action
 */
const setupMenuError = error => ({
  type: SETUP_MENU_ERROR,
  payload: { error },
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
  if (getState().menus.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: SETUP_MENU_REQUEST });
  try {
    const menu = await menuService
      .setMenu(`${config.API_BASE_URL}/api/v1/menu/`, values);
    dispatch(setupMenuSuccess(menu));
  } catch (error) {
    dispatch(setupMenuError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Update menu success action creator
 *
 * @export
 * @param {object} menu
 *
 * @returns {object} Redux action
 */
const updateMenuSuccess = menu => ({
  type: UPDATE_MENU_SUCCESS,
  payload: { menu },
});

/**
 * Update menu error action creator
 *
 * @export
 * @param {*} error
 *
 * @returns {object} Redux action
 */
const updateMenuError = error => ({
  type: UPDATE_MENU_ERROR,
  payload: { error },
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
  if (getState().menus.isUpdating) {
    return Promise.resolve();
  }

  dispatch({ type: UPDATE_MENU_REQUEST });
  try {
    const menu = await menuService
      .updateMenu(`${config.API_BASE_URL}/api/v1/menu/${menuId}`, values);
    dispatch(updateMenuSuccess(menu));
  } catch (error) {
    dispatch(updateMenuError(axiosErrorWrapper(error, dispatch)));
  }
};
