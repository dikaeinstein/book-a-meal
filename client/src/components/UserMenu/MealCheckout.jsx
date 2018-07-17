import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import Button from '../util/Button';

class MealCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: props.meal.price,
      name: props.meal.name,
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ quantity: event.target.value });
  }

  handleCheckout() {
    this.props.closeModal();
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
                  {this.state.name}
                </td>
                <td>
                  <select name="quantity" id="quantity" onChange={this.handleChange}>
                    {Array(5).fill(null).map((value, index) => (
                      <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </td>
                <td>
                  &#x20a6; {this.state.total * this.state.quantity}
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

MealCheckout.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default MealCheckout;
