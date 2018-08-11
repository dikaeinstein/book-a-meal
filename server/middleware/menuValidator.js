import { body } from 'express-validator/check';


/**
 * Validate menu name
 *
 * @param {Object} options - Options object with key optional
 *
 * @returns {ValidationChain}
 */
const menuNameValidator = ({ optional = false } = {}) => {
  /* eslint newline-per-chained-call: 0 */
  if (optional) {
    return body('name')
      .optional().trim()
      .not().isEmpty().withMessage('Menu name is required')
      .isLength({ min: 3 })
      .withMessage('Please enter a valid menu name or menu name is short')
      .not().isNumeric()
      .withMessage('Please enter a valid menu name or menu name is short');
  }
  return body('name')
    .trim()
    .exists().withMessage('Menu name is required')
    .not().isEmpty().withMessage('Menu name is required')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid menu name or menu name is short')
    .not().isNumeric()
    .withMessage('Please enter a valid menu name or menu name is short');
};


/**
 * Validate menu mealIds
 *
 * @param {Object} options - Options object with key optional
 *
 * @returns {ValidationChain}
 */
const mealIdsValidator = ({ optional = false } = {}) => {
  if (optional) {
    return body('mealIds')
      .optional()
      .isArray().withMessage('mealIds must be an array')
      .custom((mealIds) => {
        if (mealIds.length <= 0) {
          throw new Error('Menu must have at least one meal');
        }
        return true;
      })
      .custom((mealIds) => {
        const invalidMealIds =
          mealIds.filter(mealId => (
            !Number.isInteger(Number(mealId))
            || mealId > Number.MAX_SAFE_INTEGER));

        if (invalidMealIds.length > 0) {
          throw new Error('mealIds can only be integer values');
        }
        return true;
      });
  }
  return body('mealIds')
    .exists().withMessage('Menu must have at least one meal')
    .isArray().withMessage('mealIds must be an array')
    .custom((mealIds) => {
      if (mealIds.length <= 0) {
        throw new Error('Menu must have at least one meal');
      }
      return true;
    })
    .custom((mealIds) => {
      const invalidMealIds =
        mealIds.filter(mealId => (
          !Number.isInteger(Number(mealId))
          || mealId > Number.MAX_SAFE_INTEGER));

      if (invalidMealIds.length > 0) {
        throw new Error('mealIds can only be integer values');
      }
      return true;
    });
};


/**
 * @description - Validates input when setting up a menu
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateSetupMenu = () => ([
  menuNameValidator(), mealIdsValidator(),
]);


/**
 * @description - Validates input when updating up a menu
 *
 * @returns {Array} - Array of validation middleware
 */
export const validateUpdateMenu = () => ([
  menuNameValidator({ optional: true }),
  mealIdsValidator({ optional: true }),
]);
