import React from 'react';
import PropTypes from 'prop-types';

const OrderList = ({ orders }) => {
  const renderTableBody = () => {
    const disabledBtnStyle = {
      backgroundColor: '#ccc',
      cursor: 'default',
    };

    const updateBtnStyle = {
      backgroundColor: '#28a745',
    };

    const rows = orders.map((order) => {
      let orderStatus = 'text-warning';
      const disabled = order.status === 'delivered' || order.status === 'cancelled';

      if (order.status === 'cancelled') {
        orderStatus = 'text-danger';
      }

      if (order.status === 'delivered') {
        orderStatus = 'text-success';
      }

      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.meal.name}</td>
          <td>{order.user.name}</td>
          <td>{order.meal.price}</td>
          <td>{order.quantity}</td>
          <td>{order.total}</td>
          <td className={orderStatus}>{order.status}</td>
          <td>
            <div style={{ display: 'flex' }}>
              <button
                value="Edit"
                title="Update order"
                disabled={disabled}
                className="action-btn"
                style={disabled ? { ...disabledBtnStyle } : { ...updateBtnStyle }}
              >
                Update
              </button>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <tbody>
        {rows}
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
            <th>Customer</th>
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
