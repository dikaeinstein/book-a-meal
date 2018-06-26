import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import OrderHistory from '../UserOrderHistory/OrderHistory';
import { fetchUserOrders } from '../../actions/orderActions';
import Loading from '../util/Loading';

class ConnectedDashboardOrderHistory extends Component {
  componentDidMount() {
    this.props.fetchUserOrders();
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
      <main className="bg-light order-history-main text-center">
        <h2 className="text-danger">Order history</h2>
        <section className="card order-history">
          <OrderHistory />
        </section>
      </main>
    );
  }
}

ConnectedDashboardOrderHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchUserOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.orders.isFetching,
});

const mapdispatchToProps = dispatch => ({
  fetchUserOrders: () => dispatch(fetchUserOrders()),
});

const DashboardOrderHistory = connect(
  mapStateToProps,
  mapdispatchToProps,
)(ConnectedDashboardOrderHistory);

export default DashboardOrderHistory;
