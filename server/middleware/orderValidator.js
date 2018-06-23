import { body } from 'express-validator/check';
import idValidator from './idValidator';
import numberValidator from './numberValidator';


/**
 * @description - Validates input when making a new order
 *
 * @returns {Array} - Array of validation middlewares
 */
export const validateNewOrder = () => [
  idValidator('mealId', 'Meal'),
  numberValidator('total', 'Order'),
  numberValidator('quantity', 'Order'),
];


/**
 * @description - Validates input when updating an existing order
 *
 * @returns {Array} - Array of validation middlewares
 */
export const validateUpdateOrder = () => [
  idValidator('orderId', 'Order'),
  idValidator('mealId', 'Meal', { optional: true }),
  numberValidator('quantity', 'Order', { optional: true }),
  numberValidator('total', 'Order', { optional: true }),
  body('status')
    .optional()
    .not().isEmpty()
    .withMessage('Order status is required')
    .matches(/^(pending|delivered|cancelled)$/),
];
