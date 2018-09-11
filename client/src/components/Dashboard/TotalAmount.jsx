import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalAmount, getCatererTotalAmount }
  from '../../actions/dashboardActions';

export class TotalAmount extends Component {
  componentDidMount() {
    if (this.props.userRole === 'superAdmin') {
      this.props.fetchTotalAmount();
    } else {
      this.props.fetchCatererTotalAmount();
    }
  }

  render() {
    return (
      <div className="dashboard-item">
        <p className="font-weight-bold">Total Amount</p>
        <h2 className="amount font-weight-bold">
          &#x20a6; {this.props.totalAmount}
        </h2>
      </div>
    );
  }
}

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
