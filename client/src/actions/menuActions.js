import menuService from '../helpers/menuService';
import config from '../config';
import {
  FETCH_MENU_SUCCESS,
  FETCH_MENU_REQUEST,
  FETCH_MENU_ERROR,
  SETUP_MENU_ERROR,
  SETUP_MENU_REQUEST,
  SETUP_MENU_SUCCESS,
} from '../constants/menuActionTypes';

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
export const fetchMenu = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MENU_REQUEST });
    const menu = await menuService.getMenu(`${config.API_BASE_URL}/api/v1/menu/`);
    dispatch(fetchMenuSuccess(menu));
  } catch (error) {
    dispatch(fetchMenuError(error));
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
export const setupMenu = values => async (dispatch) => {
  try {
    dispatch({ type: SETUP_MENU_REQUEST });
    console.log(values);
    const menu = await menuService
      .setMenu(`${config.API_BASE_URL}/api/v1/menu/`, values);
    dispatch(setupMenuSuccess(menu));
  } catch (error) {
    dispatch(setupMenuError(error));
  }
};
