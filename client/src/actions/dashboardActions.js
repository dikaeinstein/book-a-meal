import { normalize } from 'normalizr';
import swal from 'sweetalert';
import config from '../config';
import {
  GET_TOTAL_ORDERS_ERROR,
  GET_TOTAL_ORDERS_REQUEST,
  GET_TOTAL_ORDERS_SUCCESS,
  GET_TOTAL_AMOUNT_ERROR,
  GET_TOTAL_AMOUNT_REQUEST,
  GET_TOTAL_AMOUNT_SUCCESS,
  FETCH_ALL_ORDERS_ERROR,
  FETCH_ALL_ORDERS_REQUEST,
  FETCH_ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../constants/orderActionTypes';
import dashboardService from '../helpers/dashboardService';
import orderService from '../helpers/orderService';
import transformError from '../helpers/transformError';
import axiosErrorWrapper from '../helpers/axiosErrorWrapper';
import { orderSchema, orderListSchema } from './schema';

/* eslint consistent-return: 0 */

/**
 * Get total amount success action creator
 *
 * @export
 * @param {number} totalAmount Total amount
 *
 * @returns {object} Redux action
 */
export const getTotalAmountSuccess = totalAmount => ({
  type: GET_TOTAL_AMOUNT_SUCCESS,
  response: totalAmount,
});

/**
 * Get total amount error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {Object} Redux action
 */
export const getTotalAmountError = error => ({
  type: GET_TOTAL_AMOUNT_ERROR,
  message: error,
});

/**
 * Get total amount async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const getTotalAmount = () => async (dispatch, getState) => {
  // Return early if already fetching
  if (getState().dashboard.isFetchingTotalAmount) {
    return Promise.resolve();
  }

  dispatch({ type: GET_TOTAL_AMOUNT_REQUEST });
  try {
    const totalAmount = await dashboardService
      .getTotalAmount(`${config.API_BASE_URL}/api/v1/orders/totalAmount`);
    dispatch(getTotalAmountSuccess(totalAmount));
  } catch (error) {
    dispatch(getTotalAmountError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Get caterer total amount async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const getCatererTotalAmount = () => async (dispatch, getState) => {
  // Return early if already fetching
  if (getState().dashboard.isFetchingTotalAmount) {
    return Promise.resolve();
  }

  dispatch({ type: GET_TOTAL_AMOUNT_REQUEST });
  try {
    const totalAmount = await dashboardService
      .getTotalAmount(`${config.API_BASE_URL}/api/v1/orders/totalAmount/caterers`);
    dispatch(getTotalAmountSuccess(totalAmount));
  } catch (error) {
    dispatch(getTotalAmountError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Get total number of orders made success action creator
 *
 * @export
 * @param {number} totalOrders Total number of orders made
 *
 * @returns {object} Redux action
 */
export const getTotalOrdersSuccess = totalOrders => ({
  type: GET_TOTAL_ORDERS_SUCCESS,
  response: totalOrders,
});

/**
 * Get total number of orders made error action creator
 *
 * @export
 * @param {String} error Error message
 *
 * @returns {object} Redux action
 */
export const getTotalOrdersError = error => ({
  type: GET_TOTAL_ORDERS_ERROR,
  message: error,
});

/**
 * Get total number of orders made async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const getTotalOrders = () => async (dispatch, getState) => {
  // Return early if already fetching
  if (getState().dashboard.isFetchingTotalOrders) {
    return Promise.resolve();
  }

  dispatch({ type: GET_TOTAL_ORDERS_REQUEST });
  try {
    const totalOrders = await dashboardService
      .getTotalNumberOfOrders(`${config.API_BASE_URL}/api/v1/orders/totalOrders`);
    dispatch(getTotalOrdersSuccess(totalOrders));
  } catch (error) {
    dispatch(getTotalOrdersError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Get caterer total number of orders made async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const getCatererTotalOrders = () => async (dispatch, getState) => {
  // Return early if already fetching
  if (getState().dashboard.isFetchingTotalOrders) {
    return Promise.resolve();
  }

  dispatch({ type: GET_TOTAL_ORDERS_REQUEST });
  try {
    const totalOrders = await dashboardService
      .getTotalNumberOfOrders(`${config.API_BASE_URL}/api/v1/orders/totalOrders/caterers`);
    dispatch(getTotalOrdersSuccess(totalOrders));
  } catch (error) {
    dispatch(getTotalOrdersError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Fetch all orders success action creator
 *
 * @export
 * @param {Object} response Normalized orders response
 *
 * @returns {object} Redux action
 */
export const fetchAllOrdersSuccess = response => ({
  type: FETCH_ALL_ORDERS_SUCCESS,
  response,
});

/**
 * Fetch all orders error action creator
 *
 * @export
 * @param {string} error Error message
 *
 * @returns {object} Redux action
 */
export const fetchAllOrdersError = error => ({
  type: FETCH_ALL_ORDERS_ERROR,
  message: error,
});

/**
 * Fetch all orders async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const fetchAllOrders = url => async (dispatch, getState) => {
  // Return early if already fetching
  if (getState().dashboard.isFetchingAllOrders) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_ALL_ORDERS_REQUEST });
  try {
    const response = await dashboardService.getOrders(url);
    dispatch(fetchAllOrdersSuccess(normalize(response.orders, orderListSchema)));
    dispatch({ type: 'SET_DASHBOARD_ORDERS_PAGINATION', links: response.links });
  } catch (error) {
    dispatch(fetchAllOrdersError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Fetch caterer orders async action creator
 *
 * @export
 *
 * @returns {Function} async function
 */
export const fetchCatererOrders = url => async (dispatch, getState) => {
  // Return early if already fetching
  if (getState().dashboard.isFetchingAllOrders) {
    return Promise.resolve();
  }

  dispatch({ type: FETCH_ALL_ORDERS_REQUEST });
  try {
    const response = await dashboardService.getOrders(url);
    dispatch(fetchAllOrdersSuccess(normalize(response.orders, orderListSchema)));
    dispatch({
      type: 'SET_CATERER_DASHBOARD_ORDERS_PAGINATION',
      links: response.links,
    });
  } catch (error) {
    dispatch(fetchAllOrdersError(axiosErrorWrapper(error, dispatch)));
  }
};

/**
 * Update order success action creator
 *
 * @export
 * @param {Object} response Normalized orders response
 *
 * @returns {Object} Redux action
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
 * @returns {Object} Redux action
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
  // Return early if already updating
  if (getState().dashboard.isUpdating) {
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
