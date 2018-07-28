import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalAmount } from '../../actions/dashboardActions';

const ConnectedTotalAmount = ({ totalAmount, fetchTotalAmount }) => {
  fetchTotalAmount();

  return (
    <div className="dashboard-item">
      <p className="font-weight-bold">Total Amount</p>
      <h2 className="amount font-weight-bold">&#x20a6; {totalAmount}</h2>
    </div>
  );
};

ConnectedTotalAmount.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  fetchTotalAmount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  totalAmount: state.dashboard.totalAmount,
});

const mapDispatchToProps = dispatch => ({
  fetchTotalAmount: () => dispatch(getTotalAmount()),
});

const TotalAmount =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedTotalAmount);

export default TotalAmount;
