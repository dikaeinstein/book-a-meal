import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateNewOrder = (req, res, next) => {
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

  if (mealId && validator.isNumeric(mealId)) {
    error.mealId = 'Meal id is required';
  }

  if (!userId) {
    error.userId = 'User id is required';
  }

  if (userId && validator.isEmpty(userId)) {
    error.userId = 'User id is required';
  }

  if (userId && validator.isNumeric(userId)) {
    error.userId = 'User id is required';
  }

  if (!amount) {
    error.amount = 'Order amount is required';
  }

  if (amount && validator.isEmpty(amount)) {
    error.amount = 'Order amount is required';
  }

  if (amount && validator.isNumeric(amount)) {
    error.amount = 'Order amount must be number';
  }

  if (!total) {
    error.amount = 'Order amount is required';
  }

  if (total && validator.isEmpty(total)) {
    error.amount = 'Order amount is required';
  }

  if (total && validator.isNumeric(total)) {
    error.amount = 'Order amount must be number';
  }

  if (!quantity) {
    error.quantity = 'Order quantity is required';
  }

  if (quantity && validator.isEmpty(quantity)) {
    error.quantity = 'Order quantity is required';
  }

  if (quantity && validator.isNumeric(quantity)) {
    error.quantity = 'Order quantity must be number';
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export default validateNewOrder;
