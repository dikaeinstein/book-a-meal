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
export const validateSetupMenu = (req, res, next) => {
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

/**
 * @description - Validates input when updating up a menu
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateUpateMenu = (req, res, next) => {
  const { menuId } = req.params;
  const { name, mealIds } = req.body;
  const validatedMenu = {};
  const error = {};
  let validMealIds;
  let inValidMealIds;

  if (menuId && (validator.isEmpty(menuId.trim()) || !validator.isNumeric(menuId))) {
    error.menuId = 'Menu id must be a number';
  }

  if (menuId && /^[-+][0-9]*\.?/.test(menuId.trim())) {
    error.menuId = 'Menu id cannot be less than zero';
  }

  if (menuId && /^[0-9]*\.[0-9]+$/.test(menuId.trim())) {
    error.menuId = 'Menu id must be whole numbers';
  }

  if (menuId && (menuId > Number.MAX_SAFE_INTEGER)) {
    error.menuId = 'Menu id is not a valid integer';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Meal name is required';
  }

  if (name && /\d/.test(name.trim())) {
    error.name = 'Please enter a valid meal name';
  }

  if (name && !(/(?:[a-zA-Z]+(?: [a-zA-Z]+)*){3,}/.test(name.trim()))) {
    error.name = 'Please enter a valid meal name';
  }

  if (name) {
    validatedMenu.name = name;
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

  if (mealIds) {
    validatedMenu.mealIds = validMealIds;
  }

  if (isEmpty(error)) {
    req.body.validatedMenu = validatedMenu;
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};
