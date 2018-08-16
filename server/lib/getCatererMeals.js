import { Meal } from '../models';

/**
 * Get meals owned by caterer
 *
 * @param {Number} userId Caterers user id
 *
 * @returns {Array} Return an array of mealIds owned by a caterer
 */
const getCatererMeals = async (userId) => {
  const catererMeals = await Meal.findAll({
    attributes: ['id'],
    where: {
      user_id: userId,
    },
    raw: true,
  });

  return catererMeals.map(catererMeal => catererMeal.id);
};

export default getCatererMeals;
