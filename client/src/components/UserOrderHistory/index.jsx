import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import OrderHistory from './OrderHistory';
import { fetchUserOrders } from '../../actions/orderActions';
import Loading from '../util/Loading';
import Footer from '../util/Footer';

class ConnectedUserOrderHistory extends Component {
  componentDidMount() {
    this.props.fetchUserOrders();
  }

  render() {
    const { isFetching, error } = this.props;
    if (isFetching) {
      return (
        <div className="loader-container">
          <Loading text="Loading...">
            <Preloader flashing size="big" />
          </Loading>
        </div>
      );
    }
    if (error) {
      return (
        <h1 className="error-container text-center">
          {error}
        </h1>
      );
    }
    return (
      <div>
        <main
          className="bg-light order-history-main text-center"
          style={{ minHeight: 'calc(100vh - 151px)' }}
        >
          <h2>Order history</h2>
          <section className="card order-history">
            <OrderHistory />
          </section>
        </main>
        <Footer />
      </div>
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
  error: state.orders.fetchError,
});

const mapDispatchToProps = dispatch => ({
  fetchUserOrders() { dispatch(fetchUserOrders()); },
});

const UserOrderHistory =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedUserOrderHistory);

export default UserOrderHistory;
