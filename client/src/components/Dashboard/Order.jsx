import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationDialog from '../util/ConfirmationDialog';
import { updateOrder, deleteOrder } from '../../actions/dashboardActions';

class ConnectedOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmationOpen: false,
      orderStatus: props.order.status,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCloseConfirmation = this.handleCloseConfirmation.bind(this);
  }

  handleUpdate() {
    const values = { orderStatus: this.state.orderStatus };
    this.props.modifyOrder(values);
  }

  handleDelete() {
    this.setState({ isConfirmationOpen: true });
    console.log(this.props.removeOrder);
    // this.props.removeOrder();
  }

  handleCloseConfirmation() {
    this.setState({ isConfirmationOpen: false });
  }

  render() {
    const { order } = this.props;

    const btnStyle = {
      flex: '50%',
      border: 'none',
      margin: '.5rem',
      padding: '.5rem',
      cursor: 'pointer',
      borderRadius: '3px',
      background: '#e9ebeb',
    };

    return (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.meal.name}</td>
        <td>{order.user.name}</td>
        <td>{order.meal.price}</td>
        <td>{order.quantity}</td>
        <td>{order.total}</td>
        <td className="text-warning">{order.status}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <button
              value="Edit"
              style={Object.assign({}, btnStyle, { color: 'green' })}
              title="Edit Order"
              onClick={this.handleUpdate}
            >
              Edit
            </button>
            <button
              value="Delete"
              style={Object.assign({}, btnStyle, { color: 'red' })}
              title="Delete Order"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
        </td>
        <ConfirmationDialog
          message="Are you sure you want delete order"
          isOpen={this.state.isConfirmationOpen}
          ok={this.handleCloseConfirmation}
          cancel={this.handleCloseConfirmation}
        />
      </tr>
    );
  }
}

ConnectedOrder.propTypes = {
  /* eslint react/forbid-prop-types: 0 */
  order: PropTypes.objectOf(PropTypes.number, PropTypes.string).isRequired,
  removeOrder: PropTypes.func.isRequired,
  modifyOrder: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  removeOrder: orderId => dispatch(deleteOrder(orderId)),
  deliverOrder: (values, orderId) => dispatch(updateOrder(values, orderId)),
});

const Order = connect(null, mapDispatchToProps)(ConnectedOrder);

export default Order;
