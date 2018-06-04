import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import OrderHistory from './OrderHistory';
import { fetchUserOrders } from '../actions/orderActions';

class ConnectedUserOrderHistory extends Component {
  componentDidMount() {
    this.props.fetchUserOrders();
  }

  render() {
    const { isFetching, error } = this.props;
    if (isFetching) {
      return (
        <div className="loader-container">
          <SyncLoader
            loading={isFetching}
            color="#575454"
          />
        </div>
      );
    }
    if (error) {
      return (
        <h1 className="error-container text-center">
          {error} ):
        </h1>
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

ConnectedUserOrderHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  fetchUserOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.orders.isFetching,
  error: state.orders.error,
});

const mapdispatchToProps = dispatch => ({
  fetchUserOrders: () => dispatch(fetchUserOrders()),
});

const UserOrderHistory = connect(mapStateToProps, mapdispatchToProps)(ConnectedUserOrderHistory);

export default UserOrderHistory;
