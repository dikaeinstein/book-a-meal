import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../helpers/history';
import Button from '../util/Button';
import { checkoutOrder } from '../../actions/orderActions';

class ConnectedMealCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: parseFloat(props.meal.price),
      quantity: 1,
      amount: parseFloat(props.meal.price),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const newQuantity = parseInt(event.target.value, 10);
    this.setState({
      quantity: newQuantity,
      total: newQuantity * this.state.amount,
    });
  }

  handleCheckout() {
    this.props.closeModal();
    this.props.checkoutOrder({
      mealId: this.props.meal.id,
      quantity: this.state.quantity,
      total: this.state.total,
      amount: this.props.meal.price,
    });
    history.push('/order-confirmation');
  }

  render() {
    return (
      <div id="checkout" className="text-center">
        <h3>Checkout Order</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  Meal Name
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {this.props.meal.name}
                </td>
                <td>
                  <select name="quantity" id="quantity" onChange={this.handleChange}>
                    {Array(5).fill(null).map((value, index) => (
                      <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </td>
                <td>
                  &#x20a6; {this.state.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button
          className="btn btn-default"
          value="Checkout"
          style={{ margin: '1rem auto' }}
          onClick={this.handleCheckout}
        />
      </div>
    );
  }
}

ConnectedMealCheckout.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  checkoutOrder: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  checkoutOrder: order => dispatch(checkoutOrder(order)),
});

const MealCheckout = connect(null, mapDispatchToProps)(ConnectedMealCheckout);

export default MealCheckout;
