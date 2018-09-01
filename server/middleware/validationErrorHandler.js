import { validationResult } from 'express-validator/check';

/**
 * @description Validation middleware error handler
 *
 * @param {Object} req HTTP Request
 * @param {Object} res HTTP Response
 * @param {Function} next Express callback function
 */
const validationErrorHandler = (req, res, next) => {
  const error = validationResult(req)
    .formatWith(({ msg }) => `${msg}`);

  // Check if no validation errors
  if (error.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    status: 'error',
    error: error.mapped(),
  });
};

export default validationErrorHandler;
