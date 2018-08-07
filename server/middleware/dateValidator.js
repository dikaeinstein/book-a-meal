import { query } from 'express-validator/check';

/**
 * Validate date query parameter
 *
 * @returns {ValidationChain}
 */
const dateValidator = () => (
  query('date')
    .optional()
    .trim()
    // Checks if date matches the regex
    .matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
    .withMessage('Use a valid date e.g YYYY-MM-DD')
    .custom((date) => {
      const validDate = Date.parse(date);
      if (validDate) {
        return true;
      }
      throw new Error('Use a valid date e.g YYYY-MM-DD');
    }));

export default dateValidator;
