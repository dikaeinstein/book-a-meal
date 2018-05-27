import axios from 'axios';

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

export const fetchMenu = () => (dispatch) => {
  dispatch({ type: FETCH_MENU_REQUEST });
  return axios.get(`${config.API_BASE_URL}/api/v1/menu/`)
    .then(response => dispatch(fetchMenuSuccess(response.data.menu)))
    .catch(error => dispatch(fetchMenuError(error)));
};
