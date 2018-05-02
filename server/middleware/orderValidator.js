import validator from 'validator';
import isEmpty from 'lodash.isempty';

export const validateNewOrder = (req, res, next) => {
  const {
    mealId, amount,
    total, quantity,
    userId,
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

  if (!userId) {
    error.userId = 'User id is required';
  }

  if (userId && validator.isEmpty(userId)) {
    error.userId = 'User id is required';
  }

  if (userId && !validator.isNumeric(userId)) {
    error.userId = 'User id must be a number';
  }

  if (!amount) {
    error.amount = 'Order amount is required';
  }

  if (amount && validator.isEmpty(amount)) {
    error.amount = 'Order amount is required';
  }

  if (amount && !validator.isNumeric(amount)) {
    error.amount = 'Order amount must be a number';
  }

  if (!total) {
    error.amount = 'Order total is required';
  }

  if (total && validator.isEmpty(total)) {
    error.amount = 'Order total is required';
  }

  if (total && !validator.isNumeric(total)) {
    error.amount = 'Order total must be a number';
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

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({
    error,
    status: 'error',
  });
};

export const validateUpdateOrder = (req, res, next) => {
  const { orderId } = req.params;
  const {
    mealId, amount,
    total, quantity,
    userId,
  } = req.body;
  const validatedOrder = {};
  const error = {};

  if (orderId && !validator.isNumeric(orderId.trim())) {
    error.orderId = 'Order id must be a number';
  }

  if (mealId && !validator.isNumeric(mealId.trim())) {
    error.mealId = 'Meal id must be a number';
  }

  if (mealId && validator.isNumeric(mealId.trim())) {
    validatedOrder.mealId = mealId;
  }

  if (amount && !validator.isNumeric(amount.trim())) {
    error.amount = 'Order amount must be a number';
  }

  if (amount && validator.isNumeric(amount.trim())) {
    validatedOrder.description = amount;
  }

  if (quantity && !validator.isNumeric(quantity.trim())) {
    error.quantity = 'Order quantity must be a number';
  }

  if (quantity && validator.isNumeric(quantity.trim())) {
    validatedOrder.quantity = quantity;
  }

  if (total && !validator.isNumeric(quantity.trim())) {
    error.total = 'Order total must be a number';
  }

  if (total && validator.isNumeric(quantity.trim())) {
    validatedOrder.total = total;
  }

  if (userId && !validator.isNumeric(userId.trim())) {
    error.userId = 'User id must be a nunber';
  }

  if (userId && validator.isNumeric(userId.trim())) {
    validatedOrder.userId = userId;
  }

  if (isEmpty(error)) {
    req.body.validatedOrder = validatedOrder;
    console.log(req.body.validatedOrder);
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};

export const validateGetOrder = (req, res, next) => {
  const { orderId } = req.params;
  const error = {};

  if (orderId && !validator.isNumeric(orderId)) {
    error.id = 'Order id must be a number';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};
