const orders = [];

class OrderController {
  // Get All Orders
  static getAllOrders(req, res) {
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
      matchedOrders,
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
      order.id === parseInt(req.params.id, 10)
    ))[0];

    if (!matchedOrder) {
      error.id = 'Order id does not exist';
      return res.status(404).json({ error });
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
