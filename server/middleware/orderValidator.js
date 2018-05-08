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
    error.mealId = 'Meal id is required';
  }

  if (!userId) {
    error.userId = 'User id is required';
  }

  if (userId && validator.isEmpty(userId)) {
    error.userId = 'User id is required';
  }

  if (userId && !validator.isNumeric(userId)) {
    error.userId = 'User id is required';
  }

  if (!amount) {
    error.amount = 'Order amount is required';
  }

  if (amount && validator.isEmpty(amount)) {
    error.amount = 'Order amount is required';
  }

  if (amount && !validator.isNumeric(amount)) {
    error.amount = 'Order amount must be number';
  }

  if (!total) {
    error.amount = 'Order total is required';
  }

  if (total && validator.isEmpty(total)) {
    error.amount = 'Order total is required';
  }

  if (total && !validator.isNumeric(total)) {
    error.amount = 'Order total must be number';
  }

  if (!quantity) {
    error.quantity = 'Order quantity is required';
  }

  if (quantity && validator.isEmpty(quantity)) {
    error.quantity = 'Order quantity is required';
  }

  if (quantity && !validator.isNumeric(quantity)) {
    error.quantity = 'Order quantity must be number';
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export const validateUpdateOrder = (req, res, next) => {
  const { id } = req.params;
  const {
    mealId, amount,
    total, quantity,
    userId,
  } = req.body;
  const validatedOrder = {};
  const error = {};

  if (id && !validator.isNumeric(id)) {
    error.id = 'Order id must be a number';
  }

  if (mealId) {
    validatedOrder.mealId = mealId;
  }

  if (amount) {
    validatedOrder.description = amount;
  }

  if (quantity) {
    validatedOrder.quantity = quantity;
  }

  if (total) {
    validatedOrder.total = total;
  }

  if (mealId) {
    validatedOrder.mealId = mealId;
  }

  if (userId) {
    validatedOrder.userId = userId;
  }

  if (isEmpty(error)) {
    req.body.validatedOrder = validatedOrder;
    return next();
  }

  return res.status(400).json({ error });
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

  return res.status(400).json({ error });
};
