import { body } from 'express-validator/check';

/**
 * Validate meal ${fieldName}
 *
 * @param {Object} options - Options object with key optional
 *
 * @returns {ValidationChain} - ValidationChain middleware
 */
const numberValidator = (
  fieldName,
  modelName,
  { optional = false } = {},
) => {
  /* eslint newline-per-chained-call: 0 */
  if (optional) {
    return body(fieldName)
      .optional().trim()
      .not().isEmpty().withMessage(`${modelName} ${fieldName} is required`)
      .isNumeric().withMessage(`${modelName} ${fieldName} must be numbers`)
      .isFloat({ min: 0 })
      .withMessage(`${modelName} ${fieldName} cannot be less than zero`);
  }
  return body(fieldName)
    .trim()
    .exists().withMessage(`${modelName} ${fieldName} is required`)
    .not().isEmpty().withMessage(`${modelName} ${fieldName} is required`)
    .isNumeric().withMessage(`${modelName} ${fieldName} must be numbers`)
    .isFloat({ min: 0 })
    .withMessage(`${modelName} ${fieldName} cannot be less than zero`);
};

export default numberValidator;
