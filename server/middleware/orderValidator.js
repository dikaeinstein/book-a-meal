import { body } from 'express-validator/check';
import idValidator from './idValidator';
import numberValidator from './numberValidator';

/* eslint newline-per-chained-call: 0 */

/**
 * @description - Validates input when making a new order
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateNewOrder = () => [
  idValidator('mealId', 'Meal'),
  numberValidator('total', 'Order'),
  body('quantity')
    .trim()
    .exists().withMessage('Order quantity is required')
    .not().isEmpty().withMessage('Order quantity is required')
    .isNumeric().withMessage('Order quantity must be a number')
    .isFloat({ min: 1 })
    .withMessage('Order quantity cannot be less than one'),
];


/**
 * @description - Validates input when updating an existing order
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateUpdateOrder = () => [
  idValidator('orderId', 'Order'),
  idValidator('mealId', 'Meal', { optional: true }),
  numberValidator('total', 'Order', { optional: true }),
  body('quantity')
    .trim()
    .exists().withMessage('Order quantity is required')
    .not().isEmpty().withMessage('Order quantity is required')
    .isNumeric().withMessage('Order quantity must be a number')
    .isFloat({ min: 1 })
    .withMessage('Order quantity cannot be less than one'),
  body('status')
    .optional()
    .not().isEmpty()
    .withMessage('Order status is required')
    .matches(/^(pending|delivered|cancelled)$/),
];
