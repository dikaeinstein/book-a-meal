import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalAmount, getCatererTotalAmount }
  from '../../actions/dashboardActions';

export const TotalAmount = ({
  totalAmount, fetchTotalAmount, userRole, fetchCatererTotalAmount,
}) => {
  if (userRole === 'superAdmin') {
    fetchTotalAmount();
  } else {
    fetchCatererTotalAmount();
  }

  return (
    <div className="dashboard-item">
      <p className="font-weight-bold">Total Amount</p>
      <h2 className="amount font-weight-bold">&#x20a6; {totalAmount}</h2>
    </div>
  );
};

TotalAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  userRole: PropTypes.string.isRequired,
  fetchTotalAmount: PropTypes.func.isRequired,
  fetchCatererTotalAmount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalAmount: state.dashboard.totalAmount,
  userRole: state.user.data.role,
});

export default connect(
  mapStateToProps,
  {
    fetchTotalAmount: getTotalAmount,
    fetchCatererTotalAmount: getCatererTotalAmount,
  },
)(TotalAmount);
