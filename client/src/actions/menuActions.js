import menuService from '../helpers/menuService';
import config from '../config';
import {
  FETCH_MENU_SUCCESS,
  FETCH_MENU_REQUEST,
  FETCH_MENU_ERROR,
} from '../constants/actionTypes';

export const fetchMenuSuccess = menu => ({
  type: FETCH_MENU_SUCCESS,
  payload: { menu },
});

export const fetchMenuError = error => ({
  type: FETCH_MENU_ERROR,
  payload: { error },
});

export const fetchMenu = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MENU_REQUEST });
    const menu = await menuService.getMenu(`${config.API_BASE_URL}/api/v1/menu/`);
    dispatch(fetchMenuSuccess(menu));
  } catch (error) {
    dispatch(fetchMenuError(error));
  }
};
