import validator from 'validator';
import isEmpty from 'lodash.isempty';

/**
 * @description - Validates input when making a new order
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateNewOrder = (req, res, next) => {
  const {
    mealId,
    total,
    quantity,
  } = req.body;
  const error = {};

  if (!mealId) {
    error.mealId = 'Meal id is required';
  }

  if (mealId && validator.isEmpty(mealId)) {
    error.mealId = 'Meal id is required';
  }

  if (mealId && !validator.isNumeric(mealId)) {
    error.mealId = 'Meal id must be a number';
  }

  if (mealId && /^[-+][0-9]*\.?/.test(mealId.trim())) {
    error.mealId = 'Meal id cannot be less than zero';
  }

  if (mealId && /^[0-9]*\.[0-9]+$/.test(mealId.trim())) {
    error.mealId = 'Meal id must be whole numbers';
  }

  if (mealId && (mealId > Number.MAX_SAFE_INTEGER)) {
    error.mealId = 'Meal id is not a valid integer';
  }

  if (!total) {
    error.total = 'Order total is required';
  }

  if (total && validator.isEmpty(total.trim())) {
    error.total = 'Order total is required';
  }

  if (total && !validator.isNumeric(total.trim())) {
    error.total = 'Order total must be a number';
  }

  if (total && /^[-+][0-9]*\.?/.test(total.trim())) {
    error.total = 'Order total cannot be less than zero';
  }

  if (total && /^[0-9]*\.[0-9]+$/.test(total.trim())) {
    error.total = 'Order total must be whole numbers';
  }

  if (!quantity) {
    error.quantity = 'Order quantity is required';
  }

  if (quantity && validator.isEmpty(quantity)) {
    error.quantity = 'Order quantity is required';
  }

  if (quantity && !validator.isNumeric(quantity)) {
    error.quantity = 'Order quantity must be a number';
  }

  if (quantity && /^[-+][0-9]*\.?/.test(quantity.trim())) {
    error.quantity = 'Order quantity cannot be less than zero';
  }

  if (quantity && /^[0-9]*\.[0-9]+$/.test(quantity.trim())) {
    error.quantity = 'Order quantity must be whole numbers';
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({
    error,
    status: 'error',
  });
};

/**
 * @description - Validates input when updating an existing order
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateUpdateOrder = (req, res, next) => {
  const { orderId } = req.params;
  const {
    mealId,
    total,
    quantity,
    status,
  } = req.body;
  const validatedOrder = {};
  const error = {};

  if (orderId && !validator.isNumeric(orderId.trim())) {
    error.orderId = 'Order id must be a number';
  }

  if (orderId && /^[-+][0-9]*\.?/.test(orderId.trim())) {
    error.orderId = 'Order id cannot be less than zero';
  }

  if (orderId && /^[0-9]*\.[0-9]+$/.test(orderId.trim())) {
    error.orderId = 'Order id must be a whole number';
  }

  if (orderId && (orderId > Number.MAX_SAFE_INTEGER)) {
    error.orderId = 'Order id is not a valid integer';
  }

  if (mealId && !validator.isNumeric(mealId.trim())) {
    error.mealId = 'Meal id must be a number';
  }

  if (mealId && /^[-+][0-9]*\.?/.test(mealId.trim())) {
    error.mealId = 'Meal id cannot be less than zero';
  }

  if (mealId && /^[0-9]*\.[0-9]+$/.test(mealId.trim())) {
    error.mealId = 'Meal id must be whole numbers';
  }

  if (mealId && validator.isNumeric(mealId.trim())) {
    validatedOrder.mealId = mealId;
  }

  if (mealId && (mealId > Number.MAX_SAFE_INTEGER)) {
    error.mealId = 'Meal id is not a valid integer';
  }

  if (quantity && !validator.isNumeric(quantity.trim())) {
    error.quantity = 'Order quantity must be a number';
  }

  if (quantity && /^[-+][0-9]*\.?/.test(quantity.trim())) {
    error.quantity = 'Order quantity cannot be less than zero';
  }

  if (quantity && /^[0-9]*\.[0-9]+$/.test(quantity.trim())) {
    error.quantity = 'Order quantity must be whole numbers';
  }

  if (quantity && validator.isNumeric(quantity.trim())) {
    validatedOrder.quantity = quantity;
  }

  if (total && !validator.isNumeric(total.trim())) {
    error.total = 'Order total must be a number';
  }

  if (total && /^[-+][0-9]*\.?/.test(total.trim())) {
    error.total = 'Order total cannot be less than zero';
  }

  if (total && /^[0-9]*\.[0-9]+$/.test(total.trim())) {
    error.total = 'Order total must be whole numbers';
  }

  if (total && validator.isNumeric(total.trim())) {
    validatedOrder.total = total;
  }

  if (status && validator.isEmpty(status.trim())) {
    error.status = 'Order status is required';
  }

  if (status && validator.matches(status, /^(pending|delivered|cancelled)$/)) {
    validatedOrder.status = status;
  }

  if (isEmpty(error)) {
    req.body.validatedOrder = validatedOrder;
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};

/**
 * @description - Validates request parameter: orderId
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateGetOrder = (req, res, next) => {
  const { orderId } = req.params;
  const error = {};

  if (orderId && !validator.isNumeric(orderId)) {
    error.id = 'Order id must be a number';
  }

  if (orderId && /^[-+][0-9]*\.?/.test(orderId.trim())) {
    error.orderId = 'Order id cannot be less than zero';
  }

  if (orderId && /^[0-9]*\.[0-9]+$/.test(orderId.trim())) {
    error.orderId = 'Order id must be a whole number';
  }

  if (orderId && (orderId > Number.MAX_SAFE_INTEGER)) {
    error.orderId = 'Order id is not a valid integer';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};
