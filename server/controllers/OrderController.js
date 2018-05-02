const orders = [];

class OrderController {
  // Get All Orders
  static getAllOrders(req, res) {
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
  static getAllOrdersForSpecificDate(req, res) {
    const { date } = req.params;
    // Filter by date
    const matchedOrders = orders.filter(order => order.date === date);

    return res.status(200).json({
      message: 'Orders succesfully retrieved',
      status: 'success',
      orders: matchedOrders,
    });
  }

  // Get order history for specific user
  static getUserOrderHistory(req, res) {
    const userId = req.params.userId || req.userId;

    const matchedOrders = orders.filter((order) => {
      return order.id === userId;
    });

    return res.status(200).json({
      message: 'Orders succesfully retrieved',
      status: 'success',
      orders: matchedOrders,
    });
  }

  // Get Total amount made
  static getTotalAmount(req, res) {
    const { date } = req.params;
    let total;
    if (date) {
      // Filter by date
      const matchedOrders = orders.filter(order => order.date === date);
      total = matchedOrders.reduce((start, current) => (
        start.total + current.total
      ));
    } else {
      // Use current date as default
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      const matchedOrders = orders.filter(order => (
        order.date === currentDate.toISOString()
      ));
      total = matchedOrders
        .map(matchedOrder => (
          matchedOrder.total
        ))
        .reduce((start, current) => (
          start + current
        ));
    }

    return res.status(200).json({
      message: 'Orders total amount successfully retrieved',
      status: 'success',
      total,
    });
  }

  // Make an order
  static makeAnOrder(req, res) {
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
      id: orders.length + 1,
      mealId,
      amount,
      quantity,
      total,
      userId,
      date: date.toISOString(),
    };

    orders.push(order);
    return res.status(201).json({
      message: 'Order placed',
      status: 'success',
      order,
    });
  }

  // Update an order
  static updateOrder(req, res) {
    const error = {};

    // Filter orders
    const matchedOrder = orders.filter(order => (
      order.id === parseInt(req.params.orderId, 10)
    ))[0];

    if (!matchedOrder) {
      error.id = 'Order id does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    // Merge changes
    const updatedOrder = Object
      .assign(matchedOrder, req.body.validatedMeal);

    return res.status(200).json({
      order: updatedOrder,
      status: 'success',
      message: 'Successfully updated order',
    });
  }
}

export default OrderController;
