import { body } from 'express-validator/check';
import idValidator from './idValidator';
import numberValidator from './numberValidator';


/**
 * Validate meal name
 *
 * @param {Object} options - Options object with key optional
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const mealNameValidator = ({ optional = false } = {}) => {
  if (optional) {
    /* eslint newline-per-chained-call: 0 */
    return body('name')
      .optional().trim()
      .not().isEmpty().withMessage('Meal name is required')
      .isLength({ min: 3 })
      .withMessage('Please enter a valid meal name or meal name is short')
      .not().isNumeric()
      .withMessage('Please enter a valid meal name or meal name is short');
  }
  return body('name')
    .trim()
    .exists().withMessage('Meal name is required')
    .not().isEmpty().withMessage('Meal name is required')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid meal name or meal name is short')
    .not().isNumeric()
    .withMessage('Please enter a valid meal name or meal name is short');
};


/**
 * Validate meal description
 *
 * @param {Object} options - Options object with key optional
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const mealDescriptionValidator = ({ optional = false } = {}) => {
  if (optional) {
    return body('description')
      .optional().trim()
      .not().isEmpty().withMessage('Meal description is required')
      .not().isNumeric().withMessage('Please enter a valid description')
      .isLength({ min: 3 })
      .withMessage('Meal description cannot be less than 3 characters');
  }
  return body('description')
    .trim()
    .exists().withMessage('Meal description is required')
    .not().isEmpty().withMessage('Meal description is required')
    .not().isNumeric().withMessage('Please enter a valid description')
    .isLength({ min: 3 })
    .withMessage('Meal description cannot be less than 3 characters');
};


/**
 * Validate meal image url
 *
 * @param {Object} options - Options object with key optional
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const mealImageUrlValidator = () =>
  body('imageUrl')
    .optional().trim()
    .isURL().withMessage('Meal image url must be a valid url');


/**
 * @description - Validates input when adding a new meal
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateAddMeal = () => ([
  mealNameValidator(),
  numberValidator('price', 'Meal'),
  mealDescriptionValidator(),
  mealImageUrlValidator(),
]);


/**
 * @description - Validates input when updating an existing meal
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateUpdateMeal = () => ([
  idValidator('mealId', 'Meal'),
  mealNameValidator({ optional: true }),
  numberValidator('price', 'Meal', { optional: true }),
  mealDescriptionValidator({ optional: true }),
  mealImageUrlValidator(),
]);
