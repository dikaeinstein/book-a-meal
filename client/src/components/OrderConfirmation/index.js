import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import history from '../../helpers/history';
import Button from '../util/Button';
import Footer from '../util/Footer';
import { makeOrder } from '../../actions/orderActions';

const ConnectedOrderConfirmation = ({ checkedOutOrder, orderMeal }) => {
  const btnStyle = {
    margin: '1rem',
  };
  const orderItem = {
    display: 'flex',
  };

  const handleConfirmOrder = async () => {
    try {
      await orderMeal(checkedOutOrder);
      return swal({
        title: 'Order Confirmed!',
        text: 'Order have been successfully confirmed',
        icon: 'success',
      });
    } catch (error) {
      return swal({
        text: 'Order confirmation failed, please try again',
      });
    }
  };

  return (
    <div>
      <main
        className="bg-light order-details-main"
        style={{ minHeight: 'calc(100vh - 151px)' }}
      >
        <section className="card text-center order-details">
          <h2>Order Summary</h2>
          <div style={orderItem} className="m1">
            <div className="f1">SHIPPING</div>
            <div className="f1">&#x20a6; 0</div>
          </div>
          <div style={orderItem} className="m1">
            <div className="f1">ESTIMATED TAX</div>
            <div className="f1">&#x20a6; 0</div>
          </div>
          <div style={orderItem} className="font-weight-bold m1">
            <div className="f1"><h3>TOTAL</h3></div>
            <div className="f1">
              <h2>&#x20a6; {checkedOutOrder.total}</h2>
            </div>
          </div>
          <div style={{ ...orderItem, justifyContent: 'space-around' }}>
            <Button
              value="Go Back"
              className="btn btn-default"
              style={btnStyle}
              onClick={() => { history.goBack(); }}
            />
            <Button
              value="Confirm Order"
              className="btn btn-default"
              style={btnStyle}
              onClick={handleConfirmOrder}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

ConnectedOrderConfirmation.propTypes = {
  orderMeal: PropTypes.func.isRequired,
  checkedOutOrder: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

const mapStateToProps = state => ({
  checkedOutOrder: state.orders.data.checkedOutOrder,
});

const mapDispatchToProps = dispatch => ({
  orderMeal: order => dispatch(makeOrder(order)),
});

const OrderConfirmation =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedOrderConfirmation);

export default OrderConfirmation;
