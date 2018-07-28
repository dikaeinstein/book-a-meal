import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalOrders } from '../../actions/dashboardActions';

const ConnectedTotalOrders = ({ fetchTotalOrders, totalOrders }) => {
  fetchTotalOrders();

  return (
    <div className="dashboard-item">
      <p className="font-weight-bold">Total Orders</p>
      <h2 className="amount font-weight-bold">{totalOrders}</h2>
    </div>
  );
};

ConnectedTotalOrders.propTypes = {
  totalOrders: PropTypes.number.isRequired,
  fetchTotalOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalOrders: state.dashboard.totalOrders,
});

const mapDispatchToProps = dispatch => ({
  fetchTotalOrders: () => dispatch(getTotalOrders()),
});

const TotalOrders =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedTotalOrders);

export default TotalOrders;
