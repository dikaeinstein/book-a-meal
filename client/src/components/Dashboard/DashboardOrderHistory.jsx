import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import OrderList from './OrderList';
import { fetchAllOrders, fetchCatererOrders } from '../../actions/dashboardActions';
import Loading from '../util/Loading';

class ConnectedDashboardOrderHistory extends Component {
  componentDidMount() {
    if (this.props.role === 'superAdmin') {
      this.props.getAllOrders();
    } else {
      this.props.getCatererOrders();
    }
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return (
        <div className="-lader-container">
          <Loading text="Loading...">
            <Preloader flashing size="big" />
          </Loading>
        </div>
      );
    }

    return (
      <section>
        <h2>Order history</h2>
        <OrderList orders={this.props.allOrders} />
      </section>
    );
  }
}

ConnectedDashboardOrderHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getCatererOrders: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.dashboard.isFetchingAllOrders,
  allOrders: state.dashboard.allOrders,
  role: state.user.data.role,
});

const mapDispatchToProps = dispatch => ({
  getAllOrders() { dispatch(fetchAllOrders()); },
  getCatererOrders() { dispatch(fetchCatererOrders()); },
});

const DashboardOrderHistory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedDashboardOrderHistory);

export default DashboardOrderHistory;
