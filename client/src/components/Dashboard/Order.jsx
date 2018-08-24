import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { updateOrder } from '../../actions/dashboardActions';

const ConnectedOrder = (props) => {
  const { order } = props;

  const handleDeliver = async () => {
    try {
      const willConfirmOrder = await swal({
        text: 'Deliver order?',
        buttons: true,
      });
      if (willConfirmOrder) {
        props.modifyOrder({ status: 'delivered' }, order.id);
      }
    } catch (error) {
      if (error) {
        swal('Oh noes!', 'The request failed!', 'error');
      } else {
        swal.stopLoading();
        swal.close();
      }
    }
  };

  const handleCancel = async () => {
    try {
      const willCancelOrder = await swal({
        text: 'Cancel order?',
        buttons: true,
      });
      if (willCancelOrder) {
        await props.modifyOrder({ status: 'cancelled' }, order.id);
      }
    } catch (error) {
      if (error) {
        swal('Oh noes!', 'The request failed!', 'error');
      } else {
        swal.stopLoading();
        swal.close();
      }
    }
  };

  const deliverBtnStyle = {
    backgroundColor: '#28a745',
  };

  const cancelBtnStyle = {
    backgroundColor: '#dc3545',
  };

  const disabledBtnStyle = {
    backgroundColor: '#ccc',
    cursor: 'default',
  };

  let orderStatus = 'text-warning';
  const disabled = order.status === 'delivered' || order.status === 'cancelled';

  if (order.status === 'cancelled') {
    orderStatus = 'text-danger';
  }

  if (order.status === 'delivered') {
    orderStatus = 'text-success';
  }

  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.meal.name ? order.meal.name : '-'}</td>
      <td>{order.user.name ? order.user.name : '-'}</td>
      <td>{order.meal.price ? order.meal.price : '-'}</td>
      <td>{order.quantity}</td>
      <td>{order.total}</td>
      <td className={orderStatus}>{order.status}</td>
      <td>
        <div style={{ display: 'flex' }}>
          <button
            value="Deliver"
            title="Deliver order"
            onClick={handleDeliver}
            disabled={disabled}
            className="action-btn"
            style={disabled ? { ...disabledBtnStyle } : { ...deliverBtnStyle }}
          >
            Deliver
          </button>
          <button
            value="Cancel"
            title="Cancel order"
            onClick={handleCancel}
            disabled={disabled}
            className="action-btn"
            style={disabled ? { ...disabledBtnStyle } : { ...cancelBtnStyle }}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

ConnectedOrder.propTypes = {
  order: PropTypes.objectOf(PropTypes
    .oneOfType([
      PropTypes.number, PropTypes.string,
      PropTypes.bool, PropTypes.object,
    ])).isRequired,
  modifyOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isUpdating: state.dashboard.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  modifyOrder(values, orderId) {
    dispatch(updateOrder(values, orderId));
  },
});

const Order = connect(mapStateToProps, mapDispatchToProps)(ConnectedOrder);

export default Order;
