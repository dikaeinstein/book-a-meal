import validator from 'validator';
import isEmpty from 'lodash.isempty';

export const validateAddMeal = (req, res, next) => {
  const error = {};
  const { name, description, imageUrl } = req.body;

  if (!name) {
    error.name = 'Meal name is required';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Meal name is required';
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

  if (imageUrl && validator.isEmpty(imageUrl.trim())) {
    error.imageUrl = 'Meal image url is required';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({ error });
};

export const validateUpdateMeal = (req, res, next) => {
  const { mealId } = req.params;
  const { name, imageUrl, description } = req.body;
  const validatedMeal = {};
  const error = {};

  if (mealId && !validator.isNumeric(mealId)) {
    error.id = 'Meal id must be a number';
  }

  if (name) {
    validatedMeal.name = name;
  }

  if (description) {
    validatedMeal.description = description;
  }

  if (imageUrl) {
    validatedMeal.imageUrl = imageUrl;
  }

  if (isEmpty(error)) {
    req.body.validatedMeal = validatedMeal;
    return next();
  }

  return res.status(400).json({ error });
};

export const validateGetMeal = (req, res, next) => {
  const { mealId } = req.params;
  const error = {};

  if (mealId && !validator.isNumeric(mealId)) {
    error.id = 'Meal id must be a number';
  }

  if (isEmpty(error)) {
    return next();
  }

  return res.status(400).json({ error });
};
