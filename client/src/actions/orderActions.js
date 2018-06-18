import config from '../config';
import orderService from '../helpers/orderService';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
} from '../constants/actionTypes';

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: { orders },
});

export const fetchOrdersError = error => ({
  type: FETCH_ORDERS_ERROR,
  payload: { error },
});

export const fetchUserOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });
  try {
    const orders = await orderService
      .getUserOrderHistory(`${config.API_BASE_URL}/api/v1/orders/users/1`);
    dispatch(fetchOrdersSuccess(orders));
  } catch (error) {
    dispatch(fetchOrdersError(error));
  }
};
