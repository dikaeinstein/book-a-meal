import isEmpty from 'lodash.isempty';
import validator from 'validator';

/**
 * @description - Validates input when setting up a menu
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
const menuValidator = (req, res, next) => {
  const { name, mealIds } = req.body;
  const error = {};
  let validMealIds;
  let inValidMealIds;

  if (!name) {
    error.name = 'Menu name is required';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Menu name is required';
  }

  if (name && /\d/.test(name.trim())) {
    error.name = 'Please enter a valid menu name';
  }

  if (name && !(/(?:[a-zA-Z]+(?: [a-zA-Z]+)*){3,}/.test(name.trim()))) {
    error.name = 'Please enter a valid menu name';
  }

  if (!mealIds) {
    error.mealIds = 'Menu must have at least one meal';
  }

  if (mealIds && (!Array.isArray(mealIds) || (mealIds.length <= 0))) {
    error.mealIds = 'Menu must have at least one meal';
  }

  if (mealIds && Array.isArray(mealIds)) {
    inValidMealIds = mealIds.filter(mealId => (
      !(validator.isNumeric(String(mealId))) || !(mealId < Number.MAX_SAFE_INTEGER)
    ));
    if (inValidMealIds.length > 0) {
      error.mealIds = 'mealIds can only be integer values';
    }
  }

  if (mealIds && Array.isArray(mealIds)) {
    validMealIds = mealIds.filter(mealId => (
      validator.isNumeric(String(mealId)) && mealId < Number.MAX_SAFE_INTEGER
    ));
  }

  if (isEmpty(error)) {
    req.body.mealIds = validMealIds;
    return next();
  }
  return res.status(400).json({ error });
};

export default menuValidator;
