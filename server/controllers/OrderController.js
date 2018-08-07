import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Order, User, Meal } from '../models';
import { linksURIBuilder } from '../lib/pagination';
import getAPIBaseUrl from '../lib/getAPIBaseUrl';

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
          attributes: ['name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['name'],
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

    const resourceUrl = `${API_BASE_URL}/api/v1/orders/users/${userId}`;

    // Filter by orders userId
    const userOrders = await Order.findAndCountAll({
      where: { user_id: userId },
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['name'],
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
    const {
      mealId,
      amount,
      quantity,
      total,
    } = req.body;
    const { userId } = req;
    const error = {};

    const order = {
      mealId,
      amount,
      quantity,
      total,
      userId,
    };

    const meal = await Meal.findById(mealId);

    if (!meal) {
      error.meal = 'Meal does not exist';
      return res.status(404).json({
        message: error.meal,
        status: 'error',
        error,
      });
    }
    const newOrder = await Order.create(order);
    return res.status(201).json({
      message: 'Order placed',
      status: 'success',
      order: newOrder,
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

    const currentUser = await User.findById(userId);
    const matchedOrder = await Order.findOne({
      where: { id: req.params.orderId },
    });

    if (!matchedOrder) {
      error.id = 'Order does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    if (currentUser.role === 'customer') {
      // If order has expired i.e not modifiable
      if (matchedOrder && matchedOrder.expired) {
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
      // Merge changes
      const updatedOrder = await matchedOrder.update(req.body);
      const returnOrder = await Order.findOne({
        include: [
          {
            model: Meal,
            as: 'meal',
            attributes: ['name', 'price'],
          }, {
            model: User,
            as: 'user',
            attributes: ['name'],
          },
        ],
        where: { id: updatedOrder.id },
      });

      return res.status(200).json({
        message: 'Successfully updated order',
        status: 'success',
        order: returnOrder,
      });
    }

    // For admin (caterer)
    // Merge changes
    const updatedOrder = await matchedOrder.update(req.body);
    const returnOrder = await Order.findOne({
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['name', 'price'],
        }, {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      where: { id: updatedOrder.id },
    });

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
