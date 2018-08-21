import config from '../config';
import history from '../helpers/history';
import orderService from '../helpers/orderService';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_ERROR,
  MAKE_ORDER_ERROR,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  CHECKOUT_ORDER,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../constants/orderActionTypes';
import transformError from '../helpers/transformError';

/* eslint consistent-return: 0 */

/**
 * Checkout order action creator
 *
 * @export
 * @param {object} order
 *
 * @returns Redux action
 */
export const checkoutOrder = order => ({
  type: CHECKOUT_ORDER,
  payload: { order },
});

/**
 * Fetch order success action creator
 *
 * @export
 * @param {Array} orders
 *
 * @returns {object} Redux action
 */
export const fetchOrdersSuccess = orders => ({
  type: FETCH_USER_ORDERS_SUCCESS,
  payload: { orders },
});

/**
 * Fetch order error action creator
 *
 * @export
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const fetchOrdersError = error => ({
  type: FETCH_USER_ORDERS_ERROR,
  payload: { error },
});

/**
 * Fetch user orders async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const fetchUserOrders = () => async (dispatch, getState) => {
  if (getState().orders.isFetching) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_USER_ORDERS_REQUEST });
  try {
    const orders = await orderService
      .getUserOrderHistory(`${config.API_BASE_URL}/api/v1/orders/users`);
    dispatch(fetchOrdersSuccess(orders));
  } catch (error) {
    dispatch(fetchOrdersError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Make order success action creator
 *
 * @export
 * @param {object} order
 *
 * @returns {object} Redux action
 */
export const makeOrderSuccess = order => ({
  type: MAKE_ORDER_SUCCESS,
  payload: { order },
});

/**
 * Make order error action creator
 *
 * @export
 * @param {object} order
 *
 * @returns {object} Redux action
 */
export const makeOrderError = error => ({
  type: MAKE_ORDER_ERROR,
  payload: { error },
});

/**
 * Make order async action creator
 *
 * @export
 * @param {object} order
 *
 * @returns {Function} Async function
 */
export const makeOrder = order => async (dispatch, getState) => {
  if (getState().orders.isSaving) {
    return Promise.resolve();
  }

  dispatch({ type: MAKE_ORDER_REQUEST });
  try {
    const newOrder = await orderService
      .makeOrder(`${config.API_BASE_URL}/api/v1/orders`, order);
    dispatch(makeOrderSuccess(newOrder));
    history.push('/user-order-history');
  } catch (error) {
    dispatch(makeOrderError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Delete order success action creator
 *
 * @export
 * @param {number} id Order id
 *
 * @returns {object} Redux action
 */
export const deleteOrderSuccess = id => ({
  type: DELETE_ORDER_SUCCESS,
  payload: { id },
});

/**
 * Delete order error action creator
 *
 * @export
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const deleteOrderError = error => ({
  type: DELETE_ORDER_ERROR,
  payload: { error },
});

/**
 * Delete order async action creator
 *
 * @export
 * @param {number} orderId Order id
 *
 * @returns {Function} Async function
 */
export const deleteOrder = orderId => async (dispatch, getState) => {
  if (getState().orders.isDeleting) {
    return Promise.resolve();
  }

  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    await orderService
      .deleteOrder(`${config.API_BASE_URL}/api/v1/orders/${orderId}`);
    dispatch(deleteOrderSuccess(orderId));
  } catch (error) {
    dispatch(deleteOrderError(transformError(
      axiosErrorWrapper(error, dispatch),
      'Error deleting order, please try again',
    )));
  }
};

/**
 * Update order success action creator
 *
 * @export
 * @param {object} order
 *
 * @returns {object} Redux action
 */
export const updateOrderSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: { order },
});

/**
 * Update order error  action creator
 *
 * @export
 * @param {object} error
 *
 * @returns {object} Redux action
 */
export const updateOrderError = error => ({
  type: UPDATE_ORDER_ERROR,
  payload: { error },
});

/**
 * Update order async action creator
 *
 * @export
 * @param {object} values Order payload
 * @param {number} orderId
 *
 * @returns {Function}
 */
export const updateOrder = (values, orderId) => async (dispatch, getState) => {
  if (getState().orders.isUpdating) {
    return Promise.resolve();
  }

  dispatch({ type: UPDATE_ORDER_REQUEST });
  try {
    const updatedOrder = await orderService
      .updateOrder(`${config.API_BASE_URL}/api/v1/orders/${orderId}`, values);
    dispatch(updateOrderSuccess(updatedOrder));
  } catch (error) {
    dispatch(deleteOrderError(transformError(
      axiosErrorWrapper(error, dispatch),
      'Error updating order, please try again',
    )));
  }
};
