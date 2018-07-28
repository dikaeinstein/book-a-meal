import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderList from './OrderList';

const ConnectedOrderHistory = ({ orders }) => <OrderList orders={orders} />;

ConnectedOrderHistory.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.data.userOrders,
});

const OrderHistory = connect(mapStateToProps)(ConnectedOrderHistory);

export default OrderHistory;
