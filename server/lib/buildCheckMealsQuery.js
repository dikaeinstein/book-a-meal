import { Op, literal } from 'sequelize';

/**
 * Build query to check array of mealIds
 *
 * @param {Array} mealIds Array of mealId
 *
 * @returns {object} Query object
 */
/* eslint function-paren-newline: 0 */
const buildCheckMealsQuery = (mealIds) => {
  const parsedMealIds = mealIds.map(mealId => parseInt(mealId, 10));
  return ({
    attributes: [
      literal(
        `CASE
          WHEN COUNT(*) = array_length(array[${[...parsedMealIds]}], 1)
            THEN true
          ELSE false
        END as allMealsAvailable`,
      ),
    ],
    where: {
      id: {
        [Op.any]: parsedMealIds,
      },
    },
    raw: true,
  });
};

export default buildCheckMealsQuery;
