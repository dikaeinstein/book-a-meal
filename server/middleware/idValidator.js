import { check } from 'express-validator/check';

/**
 * Validate param id
 *
 * @param {String} paramName
 * @param {String} modelName
 *
 * @returns {ValidationChain}
 */
const idValidator = (
  paramName,
  modelName,
  { optional = false } = {},
) => {
  if (optional) {
    /* eslint newline-per-chained-call: 0 */
    return check(paramName)
      .optional()
      .trim()
      .isNumeric().withMessage(`${modelName} id must be a number`)
      .isInt().withMessage(`${modelName} id must be a whole number`)
      .isInt({ min: 0 }).withMessage(`${modelName} id cannot be less than zero`)
      .isInt({ max: Number.MAX_SAFE_INTEGER })
      .withMessage(`${modelName} id is not a valid integer`);
  }

  return check(paramName)
    .trim()
    .isNumeric().withMessage(`${modelName} id must be a number`)
    .isInt().withMessage(`${modelName} id must be a whole number`)
    .isInt({ min: 0 }).withMessage(`${modelName} id cannot be less than zero`)
    .isInt({ max: Number.MAX_SAFE_INTEGER })
    .withMessage(`${modelName} id is not a valid integer`);
};

export default idValidator;
