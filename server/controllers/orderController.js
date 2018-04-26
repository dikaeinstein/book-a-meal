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
}

export default OrderController;
