import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ConnectedOrderHistory = ({ orders }) => {
  const renderTableBody = () => {
    const rows = orders.map(order => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.meal.name}</td>
        <td>{order.user.name}</td>
        <td>{order.meal.price}</td>
        <td>{order.quantity}</td>
        <td>{order.total}</td>
        <td className="text-warning">{order.status}</td>
      </tr>
    ));
    return (
      <tbody>
        {rows}
      </tbody>
    );
  };

  return (
    <div className="orders">
      <table>
        <caption className="text-left">
          &#9776; Orders
        </caption>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Customer</th>
            <th>Order Amount (&#x20a6;)</th>
            <th>Quantity</th>
            <th>Total (&#x20a6;)</th>
            <th>Status</th>
          </tr>
        </thead>
        {renderTableBody()}
      </table>
    </div>
  );
};

ConnectedOrderHistory.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.data,
});

const OrderHistory = connect(mapStateToProps)(ConnectedOrderHistory);

export default OrderHistory;
