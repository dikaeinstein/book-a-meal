import swal from 'sweetalert';
import { normalize } from 'normalizr';
import config from '../config';
import history from '../helpers/history';
import orderService from '../helpers/orderService';
import { orderSchema, orderListSchema } from './schema';
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
 * @param {Object} order Checked out order
 *
 * @returns Redux action
 */
export const checkoutOrder = order => ({
  type: CHECKOUT_ORDER,
  response: order,
});

/**
 * Fetch order success action creator
 *
 * @export
 * @param {Object} response Normalized orders response
 *
 * @returns {Object} Redux action
 */
export const fetchOrdersSuccess = response => ({
  type: FETCH_USER_ORDERS_SUCCESS,
  response,
});

/**
 * Fetch order error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
export const fetchOrdersError = error => ({
  type: FETCH_USER_ORDERS_ERROR,
  message: error,
});

/**
 * Fetch user orders async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const fetchUserOrders = url => async (dispatch, getState) => {
  if (getState().orders.isFetching) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_USER_ORDERS_REQUEST });
  try {
    const response = await orderService
      .getUserOrderHistory(url);
    dispatch(fetchOrdersSuccess(normalize(response.orders, orderListSchema)));
    dispatch({ type: 'SET_ORDERS_PAGINATION', links: response.links });
  } catch (error) {
    dispatch(fetchOrdersError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Make order success action creator
 *
 * @export
 * @param {Object} response Normalized order response
 *
 * @returns {Object} Redux action
 */
export const makeOrderSuccess = response => ({
  type: MAKE_ORDER_SUCCESS,
  response,
});

/**
 * Make order error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
export const makeOrderError = error => ({
  type: MAKE_ORDER_ERROR,
  message: error,
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
    dispatch(makeOrderSuccess(normalize(newOrder, orderSchema)));
    swal({
      title: 'Order Confirmed!',
      text: 'Order have been successfully confirmed',
      icon: 'success',
    });
    history.push('/user-order-history');
  } catch (error) {
    const normalizedError = axiosErrorWrapper(error, dispatch);
    const defaultErrorMessage = 'Order confirmation failed!, Please try again.';
    dispatch(makeOrderError(transformError(
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
 * @param {object} response Normalized order response
 *
 * @returns {object} Redux action
 */
export const updateOrderSuccess = response => ({
  type: UPDATE_ORDER_SUCCESS,
  response,
});

/**
 * Update order error  action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {object} Redux action
 */
export const updateOrderError = error => ({
  type: UPDATE_ORDER_ERROR,
  message: error,
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
    dispatch(updateOrderSuccess(normalize(updatedOrder, orderSchema)));
    swal({
      text: 'Order updated successfully!',
      icon: 'success',
      button: 'Close',
    });
  } catch (error) {
    const normalizedError = axiosErrorWrapper(error, dispatch);
    const defaultErrorMessage = 'Error updating order, please try again';
    dispatch(updateOrderError(transformError(
      normalizedError,
      defaultErrorMessage,
    )));
    swal({
      title: 'Update failed!',
      text: typeof normalizedError !== 'string'
        ? defaultErrorMessage : normalizedError,
      icon: 'error',
    });
  }
};
