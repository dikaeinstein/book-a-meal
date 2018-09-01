import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Button from '../util/Button';
import { updateOrder } from '../../actions/orderActions';

class ConnectedUpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: parseFloat(this.props.defaultOrder.total),
      quantity: this.props.defaultOrder.quantity,
      amount: parseFloat(this.props.defaultOrder.meal.price),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    if (value && value >= 1) {
      const newQuantity = parseInt(value, 10);
      this.setState({
        quantity: newQuantity,
        total: newQuantity * this.state.amount,
      });
    }
  }

  async handleQuantityUpdate() {
    this.props.closeModal();
    try {
      const willUpdateOrder = await swal({
        text: 'Update order?',
        buttons: true,
      });
      if (willUpdateOrder) {
        await this.props
          .modifyOrder({ quantity: this.state.quantity }, this.props.defaultOrder.id);
      }
    } catch (error) {
      if (error) {
        swal('Oh noes!', 'The request failed!', 'error');
      } else {
        swal.stopLoading();
        swal.close();
      }
    }
  }

  render() {
    return (
      <div id="checkout" className="text-center">
        <h3>Update Order</h3>
        <div>
          <table>
            <thead className="text-center">
              <tr>
                <th>
                  Meal Name
                </th>
                <th>
                  Quantity (Plate)
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>
                  {this.props.defaultOrder.meal.name}
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    min={1}
                    max={Number.MAX_SAFE_INTEGER}
                    style={{ width: '50%' }}
                  />
                </td>
                <td>
                  &#x20a6; {this.state.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button
            className="btn btn-default"
            value="Update Order"
            style={{ margin: '1rem .5rem', background: '#28a745' }}
            onClick={this.handleQuantityUpdate}
            title="update order"
          />
          <Button
            className="btn btn-default"
            value="Cancel"
            style={{ margin: '1rem .5rem', background: '#dc3545' }}
            onClick={this.props.closeModal}
          />
        </div>
      </div>
    );
  }
}

ConnectedUpdateOrder.propTypes = {
  defaultOrder: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
  ])).isRequired,
  closeModal: PropTypes.func.isRequired,
  modifyOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isUpdating: state.orders.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  modifyOrder(values, orderId) {
    dispatch(updateOrder(values, orderId));
  },
});

const UpdateOrder =
  connect(mapStateToProps, mapDispatchToProps)(ConnectedUpdateOrder);

export default UpdateOrder;
