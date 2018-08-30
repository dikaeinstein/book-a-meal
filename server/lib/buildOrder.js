import { Meal } from '../models';

/**
 * Build new order object
 *
 * @param {object} payload request payload
 *
 * @returns {object} order
 */
export const buildNewOrder = async (payload) => {
  const { mealId, quantity = 1 } = payload;

  const meal = await Meal.findById(mealId);
  const total = quantity * meal.price;

  return {
    mealId: meal.id,
    total,
    amount: meal.price,
    quantity,
  };
};

/**
 * Build update order object
 *
 * @param {object} order Matched order
 * @param {object} payload request payload
 *
 * @returns {object} order
 */
export const buildUpdateOrder = async (order, payload, differenceInMinutes) => {
  const {
    mealId,
    quantity = order.quantity,
    status = order.status,
  } = payload;

  const meal = mealId
    ? await Meal.findById(mealId)
    : await Meal.findById(order.mealId);

  const total = meal.price * quantity;

  return {
    mealId: meal.id,
    total,
    quantity,
    amount: meal.price,
    status,
    expired: differenceInMinutes > 30 || false,
  };
};
