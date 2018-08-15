import { Op } from 'sequelize';
import { Order } from '../models';
import getCatererMeals from '../lib/getCatererMeals';

/**
 * Get order based on user role
 *
 * @param {Number} orderId Order id
 * @param {object} user User trying to get order
 *
 * @returns {Promise<object>} Promise that resolves to an order
 */
const getCatererAdminOrder = async (orderId, user) => {
  if (user.role === 'superAdmin') {
    return Order.findOne({
      where: { id: orderId },
    });
  }

  const catererMealIds = await getCatererMeals(user.id);
  return Order.findOne({
    where: {
      id: orderId,
      meal_id: {
        [Op.in]: catererMealIds,
      },
    },
  });
};

export default getCatererAdminOrder;
