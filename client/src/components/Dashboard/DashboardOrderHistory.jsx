import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import OrderList from './OrderList';
import { fetchAllOrders } from '../../actions/dashboardActions';
import Loading from '../util/Loading';

class ConnectedDashboardOrderHistory extends Component {
  componentDidMount() {
    this.props.getAllOrders();
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
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.dashboard.isFetchingAllOrders,
  allOrders: state.dashboard.allOrders,
});

const mapdispatchToProps = dispatch => ({
  getAllOrders: () => dispatch(fetchAllOrders()),
});

const DashboardOrderHistory = connect(
  mapStateToProps,
  mapdispatchToProps,
)(ConnectedDashboardOrderHistory);

export default DashboardOrderHistory;
