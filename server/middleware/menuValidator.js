import isEmpty from 'lodash.isempty';
import validator from 'validator';

const validateMenu = (req, res, next) => {
  const { name, meals } = req.body;
  const error = {};

  if (!name) {
    error.name = 'Menu name is required';
  }

  if (name && validator.isEmpty(name)) {
    error.name = 'Menu name is required';
  }

  if (!meals) {
    error.meals = 'Menu must have atleast a meal';
  }

  if (meals && isEmpty(meals)) {
    error.meals = 'No meal have been added to menu';
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export default validateMenu;
