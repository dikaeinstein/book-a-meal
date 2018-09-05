import React from 'react';
import PropTypes from 'prop-types';
import ConnectedUserOrder from './UserOrder';

const OrderList = ({ orders }) => {
  const renderTableBody = () => {
    const orderRows = orders.map(order =>
      <ConnectedUserOrder key={order.id} order={order} />);
    return (
      <tbody>
        {orderRows}
      </tbody>
    );
  };

  return (
    <div className="orders">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Order Amount (&#x20a6;)</th>
            <th>Quantity</th>
            <th>Total (&#x20a6;)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {renderTableBody()}
      </table>
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrderList;
