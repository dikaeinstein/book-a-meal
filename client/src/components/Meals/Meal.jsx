import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Button from '../util/Button';
import MealDetail from './MealDetail';
import ConfirmDeleteButton from '../util/ConfirmDeleteButton';
import { deleteMeal } from '../../actions/mealActions';
import '../../static/hover_overlay.scss';

class ConnectedMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      meal: props.meal,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleDelete() {
    this.props.removeMeal(this.props.meal.id);
  }

  handleUpdate() {
    this.props.handleMealUpdate(this.props.meal);
  }

  render() {
    const { isDeleting, isUpdating } = this.props;

    const btnStyle = {
      flex: '50%',
      border: 'none',
      margin: '.5rem',
      padding: '.5rem',
      cursor: 'pointer',
      borderRadius: '3px',
      background: '#e9ebeb',
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
        width: '70%',
      },
    };

    return (
      <div className="card user-menu-item">
        <div
          className="overlay-container"
          onClick={this.handleOpenModal}
          onKeyPress={this.handleOpenModal}
          role="button"
          tabIndex="0"
        >
          <img
            src={this.state.meal.imageUrl}
            alt={this.state.meal.name}
          />
          <div className="overlay">
            <div className="text">
              <p>View description</p>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Meal Detail"
          style={modalStyle}
        >
          <Button
            value="&times;"
            onClick={this.handleCloseModal}
            className="close"
          />
          <MealDetail
            closeMealDetail={this.handleCloseModal}
            meal={this.state.meal}
          />
        </Modal>
        <div
          className="font-weight-bold text-black"
          style={{ padding: '.875rem' }}
        >
          <p>{this.state.meal.name}</p>
          <p style={{ fontSize: '1.25rem' }}>
            &#x20a6;{this.state.meal.price}
          </p>
        </div>
        <div style={{ display: 'flex', width: '75%', margin: '.5rem auto' }}>
          <button
            value="Edit"
            disabled={isUpdating}
            onClick={this.handleUpdate}
            style={Object.assign({}, btnStyle, { color: 'green' })}
            title="Edit Meal"
          >
            Edit
          </button>
          <ConfirmDeleteButton
            value="Delete"
            disabled={isDeleting}
            handleOk={this.handleDelete}
            style={Object.assign({}, btnStyle, { color: 'red' })}
            title="Delete Meal"
            resource="meal"
          >
            Delete
          </ConfirmDeleteButton>
        </div>
      </div>
    );
  }
}

ConnectedMeal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  handleMealUpdate: PropTypes.func.isRequired,
  removeMeal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isDeleting: state.meals.isDeleting,
  isUpdating: state.meals.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  removeMeal: id => dispatch(deleteMeal(id)),
});

const Meal = connect(mapStateToProps, mapDispatchToProps)(ConnectedMeal);

export default Meal;
