import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalOrders, getCatererTotalOrders } from '../../actions/dashboardActions';

const ConnectedTotalOrders = ({
  fetchTotalOrders, totalOrders, role, fetchCatererTotalOrders,
}) => {
  if (role === 'superAdmin') {
    fetchTotalOrders();
  } else {
    fetchCatererTotalOrders();
  }

  return (
    <div className="dashboard-item">
      <p className="font-weight-bold">Total Orders</p>
      <h2 className="amount font-weight-bold">{totalOrders}</h2>
    </div>
  );
};

ConnectedTotalOrders.propTypes = {
  totalOrders: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  fetchTotalOrders: PropTypes.func.isRequired,
  fetchCatererTotalOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalOrders: state.dashboard.totalOrders,
  role: state.user.data.role,
});

const mapDispatchToProps = dispatch => ({
  fetchTotalOrders: () => dispatch(getTotalOrders()),
  fetchCatererTotalOrders: () => dispatch(getCatererTotalOrders()),
});

const TotalOrders =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedTotalOrders);

export default TotalOrders;
