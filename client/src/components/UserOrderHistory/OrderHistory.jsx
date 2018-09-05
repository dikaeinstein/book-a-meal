import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderList from './OrderList';
import { getOrders } from '../../reducers/orderReducer';

export const OrderHistory = ({ orders }) => <OrderList orders={orders} />;

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  orders: getOrders(state.orders),
});

export default connect(mapStateToProps)(OrderHistory);
