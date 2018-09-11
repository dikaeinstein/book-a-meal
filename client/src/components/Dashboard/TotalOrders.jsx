import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotalOrders, getCatererTotalOrders }
  from '../../actions/dashboardActions';

export class TotalOrders extends Component {
  componentDidMount() {
    if (this.props.userRole === 'superAdmin') {
      this.props.fetchTotalOrders();
    } else {
      this.props.fetchCatererTotalOrders();
    }
  }

  render() {
    return (
      <div className="dashboard-item">
        <p className="font-weight-bold">Total Orders</p>
        <h2 className="amount font-weight-bold">
          {this.props.totalOrders}
        </h2>
      </div>
    );
  }
}


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
