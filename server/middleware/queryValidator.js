import { query } from 'express-validator/check';

/* eslint newline-per-chained-call: 0 */

/**
 * Validate url query params
 *
 * @param {number} paramName Url query param
 *
 * @returns {ValidationChain}
 */
const queryValidator = paramName => query(paramName)
  .optional()
  .trim()
  .isNumeric().withMessage(`${paramName} must be a number`)
  .isInt().withMessage(`${paramName} must be a whole number`)
  .isInt({ min: 0 }).withMessage(`${paramName} cannot be less than zero`)
  .isInt({ max: Number.MAX_SAFE_INTEGER })
  .withMessage(`${paramName} is not a valid integer`);


export default queryValidator;
