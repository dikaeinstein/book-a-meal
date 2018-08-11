import { Op, literal } from 'sequelize';

/**
 * Build query to check array of mealIds
 *
 * @param {Array} mealIds Array of mealId
 *
 * @returns {object} Query object
 */
/* eslint function-paren-newline: 0 */
const buildCheckMealsQuery = mealIds =>
  ({
    attributes: [
      literal(
        `CASE
          WHEN COUNT(*) = array_length(array[${[...mealIds]}], 1)
            THEN true
          ELSE false
        END as allMealsAvailable`,
      ),
    ],
    where: {
      id: {
        [Op.any]: mealIds,
      },
    },
    raw: true,
  });

export default buildCheckMealsQuery;
