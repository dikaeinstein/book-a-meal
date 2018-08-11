import { Meal } from '../models';

/**
 * Checks that order total is the expected total
 *
 * @param {object} order Meal order
 *
 * @returns {boolean} True or False
 */
const isExpectedTotal = async (order) => {
  const { mealId, quantity, total } = order;
  const { price } = await Meal.findById(mealId);
  const expectedTotal = Number(price) * parseInt(quantity, 10);

  return expectedTotal === Number(total);
};

export default isExpectedTotal;
