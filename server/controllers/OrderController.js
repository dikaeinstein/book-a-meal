import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Order, User, Meal, Menu } from '../models';
import { linksURIBuilder } from '../lib/pagination';
import getAPIBaseUrl from '../lib/getAPIBaseUrl';
import { buildNewOrder, buildUpdateOrder } from '../lib/buildOrder';
import getCatererMeals from '../lib/getCatererMeals';
import getCatererAdminOrder from '../lib/getCatererAdminOrder';

dotenv.config();

const API_BASE_URL = getAPIBaseUrl();

/**
 * @class OrderController
 *
 * @export
 */
class OrderController {
  /**
  * @description Get all orders
  * @static
  * @async
  *
  * @param {object} req HTTP Request
  * @param {object} res HTTP Response
  *
  * @memberof OrderController
  *
  * @returns {Promise<object>}
  */
  static async getAllOrders(req, res) {
    const error = {};
    const { date } = req.query;
    const limit = parseInt(req.query.limit, 10) || 30;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);

    const resourceUrl = `${API_BASE_URL}/api/v1/orders`;
    const findOptions = {
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['id', 'name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']],
    };

    const validDate = new Date(date);

    const orders = await Order.findAndCountAll(date
      ? {
        ...findOptions,
        where: {
          created_at: {
            [Op.gt]: new Date(validDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(validDate.setDate(validDate.getDate() + 1)),
          },
        },
      }
      : findOptions);

    if (orders.count === 0) {
      error.message = 'No order have been placed';
      return res.status(404).json({
        status: 'error',
        message: error.message,
        error,
      });
    }

    const totalPages = Math.ceil(orders.count / limit);

    // Array of links for traversing meals using pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, orders.count, limit);

    return res.status(200).json({
      message: 'Orders successfully retrieved',
      status: 'success',
      orders: orders.rows,
      links,
    });
  }

  /**
   * @description Get meal orders for specific caterer
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async getCatererOrders(req, res) {
    const userId = req.params.userId || req.userId;
    const error = {};
    const { date } = req.query;
    const limit = parseInt(req.query.limit, 10) || 30;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);

    const resourceUrl = `${API_BASE_URL}/api/v1/orders/caterers`;
    const findOptions = {
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['id', 'name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']],
    };

    const parsedDate = new Date(date);
    const catererMealIds = await getCatererMeals(userId);
    const orders = await Order.findAndCountAll(date
      ? {
        ...findOptions,
        where: {
          created_at: {
            [Op.gt]: new Date(parsedDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(parsedDate.setDate(parsedDate.getDate() + 1)),
          },
          meal_id: {
            [Op.in]: catererMealIds,
          },
        },
      }
      : {
        ...findOptions,
        where: {
          meal_id: {
            [Op.in]: catererMealIds,
          },
        },
      });

    if (orders.count === 0) {
      error.message = 'No order have been placed';
      return res.status(404).json({
        status: 'error',
        message: error.message,
        error,
      });
    }

    const totalPages = Math.ceil(orders.count / limit);

    // Array of links for traversing meals using pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, orders.count, limit);

    return res.status(200).json({
      message: 'Orders successfully retrieved',
      status: 'success',
      orders: orders.rows,
      links,
    });
  }

  /**
   * @description Get order history for specific user
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async getUserOrderHistory(req, res) {
    const userId = req.params.userId || req.userId;
    const limit = parseInt(req.query.limit, 10) || 30;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);
    const error = {};

    const resourceUrl = `${API_BASE_URL}/api/v1/orders/users`;

    // Filter by orders userId
    const userOrders = await Order.findAndCountAll({
      where: { user_id: userId },
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['id', 'name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    if (userOrders.count === 0) {
      error.order = 'No order have been placed';
      return res.status(404).json({
        status: 'error',
        message: error.order,
        error,
      });
    }

    const totalPages = Math.ceil(userOrders.count / limit);

    // Array of links for traversing meals using pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, userOrders.count, limit);

    return res.status(200).json({
      message: 'Orders successfully retrieved',
      status: 'success',
      orders: userOrders.rows,
      links,
    });
  }

  /**
   * @description Get Total amount made
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async getTotalAmount(req, res) {
    const { date } = req.query;
    const validDate = new Date(date);
    let totalAmount = 0;

    if (date) {
      // Filter orders by date and return sum
      totalAmount = await Order.sum('total', {
        where: {
          created_at: {
            [Op.gt]: new Date(validDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(validDate.setDate(validDate.getDate() + 1)),
          },
        },
      });
    }

    totalAmount = await Order.sum('total');

    return res.status(200).json({
      message: 'Orders total amount successfully retrieved',
      status: 'success',
      totalAmount,
    });
  }

  /**
  * @description Get Total amount made for specific caterer
  * @static
  * @async
  *
  * @param {object} req HTTP Request
  * @param {object} res HTTP Response
  *
  * @memberof OrderController
  *
  * @returns {Promise<JSON>}
  */
  static async getCatererTotalAmount(req, res) {
    const { date } = req.query;
    const userId = req.params.userId || req.userId;
    const validDate = new Date(date);
    let totalAmount = 0;

    const catererMealIds = await getCatererMeals(userId);
    if (date) {
      // Filter orders by date and return sum
      totalAmount = await Order.sum('total', {
        where: {
          created_at: {
            [Op.gt]: new Date(validDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(validDate.setDate(validDate.getDate() + 1)),
          },
          meal_id: {
            [Op.in]: catererMealIds,
          },
        },
      });
    }

    totalAmount = await Order.sum('total', {
      where: {
        meal_id: {
          [Op.in]: catererMealIds,
        },
      },
    });

    return res.status(200).json({
      message: 'Orders total amount successfully retrieved',
      status: 'success',
      totalAmount,
    });
  }

  /**
   * @description Get total number of orders made
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async getTotalNumberOfOrders(req, res) {
    let totalOrders = 0;
    const { date } = req.query;
    const validDate = new Date(date);
    if (date) {
      // Filter orders by date and return count
      totalOrders = await Order.count({
        where: {
          created_at: {
            [Op.gt]: new Date(validDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(validDate.setDate(validDate.getDate() + 1)),
          },
        },
      });
    }

    totalOrders = await Order.count();

    return res.status(200).json({
      message: 'Total number of orders made successfully retrieved',
      status: 'success',
      totalOrders,
    });
  }

  /**
   * @description Get total number of orders made for a caterer meals
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async getCatererTotalNumberOfOrders(req, res) {
    let totalOrders = 0;
    const { date } = req.query;
    const userId = req.params.userId || req.userId;
    const validDate = new Date(date);
    const catererMealIds = await getCatererMeals(userId);

    if (date) {
      // Filter orders by date and return count
      totalOrders = await Order.count({
        where: {
          created_at: {
            [Op.gt]: new Date(validDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(validDate.setDate(validDate.getDate() + 1)),
          },
          meal_id: {
            [Op.in]: catererMealIds,
          },
        },
      });
    }

    totalOrders = await Order.count({
      where: {
        meal_id: {
          [Op.in]: catererMealIds,
        },
      },
    });

    return res.status(200).json({
      message: 'Total number of orders made successfully retrieved',
      status: 'success',
      totalOrders,
    });
  }

  /**
   * @description Make an order
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async makeAnOrder(req, res) {
    const { userId } = req;
    const error = {};

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const menu = await Menu.findOne({
      where: {
        created_at: {
          [Op.gt]: new Date(currentDate - (24 * 60 * 60 * 1000)),
          [Op.lt]: new Date(currentDate.setDate(currentDate.getDate() + 1)),
        },
      },
    });

    if (!menu) {
      error.menu = 'Sorry!, menu for the day have not been set';
      return res.status(404).json({
        message: error.meal,
        status: 'error',
        error,
      });
    }

    const mealExist = await menu.hasMeal(req.body.mealId);

    if (!mealExist) {
      error.meal = 'The meal you want to order is not on todays menu';
      return res.status(404).json({
        message: error.meal,
        status: 'error',
        error,
      });
    }
    const order = await buildNewOrder(req.body);

    const newOrder = await Order.create({ ...order, userId });
    const returnedOrder = await Order.findOne({
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['id', 'name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      where: { id: newOrder.id },
    });

    return res.status(201).json({
      message: 'Order placed',
      status: 'success',
      order: returnedOrder,
    });
  }

  /**
   * @description Update an order
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async updateOrder(req, res) {
    const error = {};
    const { userId } = req;
    const { mealId } = req.body;
    const { orderId } = req.params;

    if (mealId) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);

      const todayMenu = await Menu.findOne({
        where: {
          created_at: {
            [Op.gt]: new Date(currentDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(currentDate.setDate(currentDate.getDate() + 1)),
          },
        },
      });

      if (!todayMenu) {
        error.menu = 'Sorry!, menu for the day have not been set';
        return res.status(404).json({
          message: error.meal,
          status: 'error',
          error,
        });
      }

      const mealExist = await todayMenu.hasMeal(mealId);

      if (!mealExist) {
        error.meal = 'The meal you want to order is not on todays menu';
        return res.status(404).json({
          message: error.meal,
          status: 'error',
          error,
        });
      }
    }

    const currentUser = await User.findById(userId);
    let matchedOrder;

    const findOrder = order => Order.findOne({
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['id', 'name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      where: { id: order.id },
    });

    if (currentUser.role === 'customer') {
      matchedOrder = await Order.findOne({
        where: { id: orderId, user_id: userId },
      });

      if (!matchedOrder) {
        error.id = 'Order does not exist';
        return res.status(404).json({
          message: error.id,
          status: 'error',
          error,
        });
      }

      // If order has been cancelled
      if (matchedOrder.status === 'cancelled') {
        error.message = 'You cannot update a cancelled order';
        return res.status(405).json({
          message: error.message,
          status: 'error',
          error,
        });
      }

      // If order has expired i.e not modifiable
      if (matchedOrder.expired) {
        error.message = 'You can no longer update this order';
        return res.status(405).json({
          message: error.message,
          status: 'error',
          error,
        });
      }

      // If the allowed time(30mins) to modify order has elapsed
      const differenceInMinutes =
        Math.floor((Date.now() - matchedOrder.createdAt) / 60000);
      if (differenceInMinutes >= 30) {
        error.message = 'You can no longer update this order';
        await matchedOrder.update({ expired: true });
        return res.status(405).json({
          message: error.message,
          status: 'error',
          error,
        });
      }

      const order = await buildUpdateOrder(matchedOrder, req.body);

      // Merge changes
      const updatedOrder = await matchedOrder.update(order);
      const returnOrder = await findOrder(updatedOrder);

      return res.status(200).json({
        message: 'Successfully updated order',
        status: 'success',
        order: returnOrder,
      });
    }

    // For admin (caterer)
    // get order based on user role
    matchedOrder = await getCatererAdminOrder(orderId, currentUser);
    if (!matchedOrder) {
      error.id = 'Order does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    // Merge changes
    const differenceInMinutes =
        Math.floor((Date.now() - matchedOrder.createdAt) / 60000);
    const order = await buildUpdateOrder(matchedOrder, req.body, differenceInMinutes);
    const updatedOrder = await matchedOrder.update(order);
    const returnOrder = await findOrder(updatedOrder);

    return res.status(200).json({
      message: 'Successfully updated order',
      status: 'success',
      order: returnOrder,
    });
  }

  /**
   * @description Delete a specific order
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   *
   * @memberof OrderController
   *
   * @returns {Promise<object>}
   */
  static async deleteOrder(req, res) {
    const error = {};

    // Find Order
    const matchedOrder = await Order.findOne({
      where: { id: req.params.orderId },
    });

    if (matchedOrder) {
      await matchedOrder.destroy();
      return res.status(200).json({
        message: 'Order successfully deleted',
        status: 'success',
      });
    }

    error.id = 'Order does not exist';
    return res.status(404).json({
      message: error.id,
      status: 'error',
      error,
    });
  }
}

export default OrderController;
