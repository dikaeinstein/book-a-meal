import { body } from 'express-validator/check';
import idValidator from './idValidator';

/* eslint newline-per-chained-call: 0 */

/**
 * @description - Validates input when making a new order
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateNewOrder = () => [
  idValidator('mealId', 'Meal'),
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
  body('quantity')
    .optional()
    .trim()
    .not().isEmpty().withMessage('Order quantity is required')
    .isNumeric().withMessage('Order quantity must be a number')
    .isFloat({ min: 1 })
    .withMessage('Order quantity cannot be less than one'),
  body('status')
    .optional()
    .not().isEmpty()
    .withMessage('Order status is required')
    .custom((status, { req }) => {
      if (req.role === 'customer' && !(/^(pending|cancelled)$/.test(status))) {
        throw new Error('You can only cancel an order');
      }
      return true;
    })
    .matches(/^(pending|delivered|cancelled)$/)
    .withMessage('Invalid order status!'),
];
