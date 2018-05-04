import isEmpty from 'lodash.isempty';
import validator from 'validator';

const validateMenu = (req, res, next) => {
  const { name, mealIds } = req.body;
  const error = {};

  if (!name) {
    error.name = 'Menu name is required';
  }

  if (name && validator.isEmpty(name.trim())) {
    error.name = 'Menu name is required';
  }

  if (!mealIds) {
    error.meals = 'Menu must have at least one meal';
  }

  if (mealIds && isEmpty(mealIds)) {
    error.meals = 'Menu must have at least one meal';
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export default validateMenu;