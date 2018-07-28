import React from 'react';
import PropTypes from 'prop-types';

const OrderList = ({ orders }) => {
  const btnStyle = {
    flex: '50%',
    border: 'none',
    margin: '.5rem',
    padding: '.5rem',
    cursor: 'pointer',
    borderRadius: '3px',
    background: '#e9ebeb',
  };

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
        <td>
          <div style={{ display: 'flex' }}>
            <button
              value="Edit"
              style={Object.assign({}, btnStyle, { color: 'green' })}
              title="Edit Order"
            >
              Edit
            </button>
          </div>
        </td>
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
