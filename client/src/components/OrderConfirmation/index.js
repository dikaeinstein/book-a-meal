import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  const handleConfirmOrder = () => orderMeal(checkedOutOrder);

  const handleGoBack = () => history.push('/user-menu');

  return (
    <div>
      <main
        className="bg-light order-details-main"
        style={{ minHeight: 'calc(100vh - 151px)' }}
      >
        <section className="card text-center order-details">
          <h2>Order Summary</h2>
          <div style={orderItem} className="m1">
            <div className="f1">Meal</div>
            <div className="f1">{checkedOutOrder.name}</div>
          </div>
          <div style={orderItem} className="m1">
            <div className="f1">Quantity</div>
            <div className="f1">
              {checkedOutOrder.quantity}{' '}
              plate{checkedOutOrder.quantity > 1 ? 's' : ''}
            </div>
          </div>
          <div style={orderItem} className="font-weight-bold m1">
            <div className="f1"><h3>TOTAL</h3></div>
            <div className="f1">
              <h2>&#x20a6; {checkedOutOrder.total}</h2>
            </div>
          </div>
          <div style={{ ...orderItem, justifyContent: 'space-around' }}>
            <Button
              value="Back to menu"
              className="btn btn-default"
              style={btnStyle}
              onClick={handleGoBack}
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
  checkedOutOrder: state.orders.checkedOutOrder,
});

const mapDispatchToProps = dispatch => ({
  orderMeal(order) { dispatch(makeOrder(order)); },
});

const OrderConfirmation =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedOrderConfirmation);

export default OrderConfirmation;
