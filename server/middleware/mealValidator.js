import validator from 'validator';
import isEmpty from 'lodash.isempty';

/**
 * @description - Validates input when making a new meal
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateAddMeal = (req, res, next) => {
  const error = {};
  const {
    name, description, imageUrl, price,
  } = req.body;

  if (!name) {
    error.name = 'Meal name is required';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Meal name is required';
  }

  if (!price) {
    error.price = 'Meal price is required';
  }

  if (price && (validator.isEmpty(price.trim()) || !validator.isNumeric(price.trim()))) {
    error.price = 'Meal price must be numbers';
  }

  if (!description) {
    error.description = 'Meal description is required';
  }

  if (description && validator.isEmpty(description.trim())) {
    error.description = 'Meal description is required';
  }

  if (!imageUrl) {
    error.imageUrl = 'Meal image url is required';
  }

  if (imageUrl && (validator.isEmpty(imageUrl.trim() || !validator.isURL(imageUrl.trim())))) {
    error.imageUrl = 'Meal image url must be a url';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};

/**
 * @description - Validates input when updating an existing meal
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateUpdateMeal = (req, res, next) => {
  const { mealId } = req.params;
  const {
    name,
    imageUrl,
    description,
    price,
  } = req.body;
  const validatedMeal = {};
  const error = {};

  if (mealId && (validator.isEmpty(mealId.trim()) || !validator.isNumeric(mealId))) {
    error.id = 'Meal id must be a number';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Meal name is required';
  }

  if (name) {
    validatedMeal.name = name;
  }

  if (description && validator.isEmpty(description.trim())) {
    error.description = 'Meal description is required';
  }

  if (description) {
    validatedMeal.description = description;
  }

  if (imageUrl && validator.isEmpty(imageUrl.trim())) {
    error.imageUrl = 'Meal image url is required';
  }

  if (imageUrl && !validator.isURL(imageUrl.trim())) {
    error.imageUrl = 'Meal image url must be a valid url';
  }

  if (imageUrl) {
    validatedMeal.imageUrl = imageUrl;
  }

  if (price && validator.isEmpty(price.trim())) {
    error.price = 'Meal price is required';
  }

  if (price && !validator.isNumeric(price.trim())) {
    error.price = 'Meal price must be a number';
  }

  if (price) {
    validatedMeal.price = price;
  }

  if (isEmpty(error)) {
    req.body.validatedMeal = validatedMeal;
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};

/**
 * @description - Validates request parameter: mealId
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {function} next - Callback function
 *
 * @returns {object}
 */
export const validateGetMeal = (req, res, next) => {
  const { mealId } = req.params;
  const error = {};

  if (mealId && (validator.isEmpty(mealId.trim()) || !validator.isNumeric(mealId))) {
    error.id = 'Meal id must be a number';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error,
  });
};
