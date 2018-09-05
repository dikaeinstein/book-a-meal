import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalOrders, getCatererTotalOrders }
  from '../../actions/dashboardActions';

export const TotalOrders = ({
  fetchTotalOrders, totalOrders, userRole, fetchCatererTotalOrders,
}) => {
  if (userRole === 'superAdmin') {
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

TotalOrders.propTypes = {
  totalOrders: PropTypes.number.isRequired,
  userRole: PropTypes.string.isRequired,
  fetchTotalOrders: PropTypes.func.isRequired,
  fetchCatererTotalOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalOrders: state.dashboard.totalOrders,
  userRole: state.user.data.role,
});

export default connect(
  mapStateToProps,
  {
    fetchTotalOrders: getTotalOrders,
    fetchCatererTotalOrders: getCatererTotalOrders,
  },
)(TotalOrders);
