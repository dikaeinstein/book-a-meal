import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalAmount, getCatererTotalAmount } from '../../actions/dashboardActions';

const ConnectedTotalAmount = ({
  totalAmount, fetchTotalAmount, role, fetchCatererTotalAmount,
}) => {
  if (role === 'superAdmin') {
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

ConnectedTotalAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  fetchTotalAmount: PropTypes.func.isRequired,
  fetchCatererTotalAmount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalAmount: state.dashboard.totalAmount,
  role: state.user.data.role,
});

const mapDispatchToProps = dispatch => ({
  fetchTotalAmount() { dispatch(getTotalAmount()); },
  fetchCatererTotalAmount() { dispatch(getCatererTotalAmount()); },
});

const TotalAmount =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedTotalAmount);

export default TotalAmount;
