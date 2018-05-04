import format from 'date-fns/format';
import { Op } from 'sequelize';
import { Order } from '../models';


class OrderController {
  // Get All Orders
  static async getAllOrders(req, res) {
    const orders = await Order.findAll();
    if (orders.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No order have been placed',
        orders,
      });
    }

    return res.status(200).json({
      message: 'Orders succesfully retrieved',
      status: 'success',
      orders,
    });
  }

  // Get All Orders for specific day
  static async getAllOrdersForSpecificDate(req, res) {
    const { date } = req.params;
    // Filter orders by date
    const matchedOrders = await Order.findAll({
      where: { created_at: date },
    });

    if (matchedOrders.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No order have been placed',
        orders: matchedOrders,
      });
    }

    return res.status(200).json({
      message: 'Orders succesfully retrieved',
      status: 'success',
      orders: matchedOrders,
    });
  }

  // Get order history for specific user
  static async getUserOrderHistory(req, res) {
    const userId = req.params.userId || req.userId;

    // Filter by orders userId
    const matchedOrders = await Order.findAll({
      where: { id: userId },
    });

    if (matchedOrders.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No order have been placed',
        orders: matchedOrders,
      });
    }

    return res.status(200).json({
      message: 'Orders succesfully retrieved',
      status: 'success',
      orders: matchedOrders,
    });
  }

  // Get Total amount made
  static async getTotalAmount(req, res) {
    const { date } = req.params;
    let total;
    let matchedOrders;
    if (date) {
      // Filter orders by date
      matchedOrders = await Order.findAll({
        where: {
          created_at: {
            [Op.gte]: format(date),
          },
        },
      });
    } else {
      // Use current date as default
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);

      matchedOrders = await Order.findAll({
        where: {
          created_at: {
            [Op.gte]: format(currentDate.toISOString()),
          },
        },
      });
      if (matchedOrders.length > 0) {
        total = matchedOrders
          .map(matchedOrder => (
            matchedOrder.total
          ))
          .reduce((start, current) => (
            start + current
          ));
      } else {
        total = 0;
      }
    }

    return res.status(200).json({
      message: 'Orders total amount successfully retrieved',
      status: 'success',
      total,
    });
  }

  // Make an order
  static async makeAnOrder(req, res) {
    const {
      mealId,
      amount,
      quantity,
      total,
      userId,
    } = req.body;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    const order = {
      meal_id: mealId,
      amount,
      quantity,
      total,
      user_id: userId,
    };

    const newOrder = await Order.create(order);
    return res.status(201).json({
      message: 'Order placed',
      status: 'success',
      order: newOrder,
    });
  }

  // Update an order
  static async updateOrder(req, res) {
    const error = {};

    // Filter orders
    const matchedOrder = await Order.findOne({
      where: { id: req.params.orderId },
    });

    if (!matchedOrder) {
      error.id = 'Order id does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    // Merge changes
    const updatedOrder = await matchedOrder.update(req.body.validatedOrder);
    return res.status(200).json({
      order: updatedOrder,
      status: 'success',
      message: 'Successfully updated order',
    });
  }

  // Delete Order
  static async deleteOrder(req, res) {
    const error = {};
    // Find Order
    const matchedOrder = await Order.findOne({
      where: { id: req.params.OrderId },
    });

    if (matchedOrder) {
      const deletedOrder = await matchedOrder.destroy();
      return res.status(201).json({
        message: 'Order successfully deleted',
        status: 'success',
        order: deletedOrder,
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
