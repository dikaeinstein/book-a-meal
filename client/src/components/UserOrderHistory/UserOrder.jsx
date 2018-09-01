import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import UpdateOrder from './UpdateOrder';
import Button from '../util/Button';
import { updateOrder } from '../../actions/orderActions';


class ConnectedUserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  async handleCancel() {
    try {
      const willCancelOrder = await swal({
        text: 'Cancel order?',
        buttons: true,
      });
      if (willCancelOrder) {
        this.props.modifyOrder(
          { status: 'cancelled' },
          this.props.order.id,
        );
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
    // styles
    const disabledBtnStyle = {
      backgroundColor: '#ccc',
      cursor: 'default',
    };
    const updateBtnStyle = {
      backgroundColor: '#28a745',
    };
    const cancelBtnStyle = {
      backgroundColor: '#dc3545',
    };

    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '20rem',
        width: '45%',
      },
    };

    const { order } = this.props;
    let orderStatus = 'text-warning';
    const disabled = order.status === 'delivered'
      || order.status === 'cancelled'
      || order.expired;

    if (order.status === 'cancelled') {
      orderStatus = 'text-danger';
    }

    if (order.status === 'delivered') {
      orderStatus = 'text-success';
    }

    return (
      <React.Fragment>
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.meal.name}</td>
          <td>{order.meal.price}</td>
          <td>{order.quantity}</td>
          <td>{order.total}</td>
          <td className={orderStatus}>{order.status}</td>
          <td>
            <div style={{ display: 'flex' }}>
              <button
                value="Edit"
                title="Update order"
                disabled={disabled}
                className="action-btn"
                style={disabled ? disabledBtnStyle : updateBtnStyle}
                onClick={this.handleOpenModal}
              >
                Update
              </button>
              <button
                value="Cancel"
                title="Cancel order"
                onClick={this.handleCancel}
                disabled={disabled}
                className="action-btn"
                style={disabled ? disabledBtnStyle : cancelBtnStyle}
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
        <Modal
          isOpen={this.state.isModalOpen}
          contentLabel="Update order"
          style={modalStyle}
          closeTimeoutMS={150}
        >
          <Button
            value="&times;"
            onClick={this.handleCloseModal}
            className="close"
          />
          <UpdateOrder
            defaultOrder={this.props.order}
            closeModal={this.handleCloseModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

ConnectedUserOrder.propTypes = {
  order: PropTypes.objectOf(PropTypes
    .oneOfType([
      PropTypes.number, PropTypes.string,
      PropTypes.bool, PropTypes.object,
    ])).isRequired,
  modifyOrder: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  modifyOrder(values, orderId) {
    dispatch(updateOrder(values, orderId));
  },
});

const UserOrder = connect(null, mapDispatchToProps)(ConnectedUserOrder);

export default UserOrder;
