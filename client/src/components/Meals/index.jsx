import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CatererMeals from './CatererMeals';
import AddMeal from './AddMeal';
import UpdateMeal from './UpdateMeal';
import Footer from '../util/Footer';
import Button from '../util/Button';
import errorHandler from '../util/errorHandler';

Modal.setAppElement('#root');

class ConnectedMeals extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      updating: false,
      meal: {},
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleMealUpdate = this.handleMealUpdate.bind(this);
    this.handleAddMeal = this.handleAddMeal.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleMealUpdate(meal) {
    this.setState({ updating: true, meal });
    this.handleOpenModal();
  }

  handleAddMeal() {
    this.setState({ updating: false });
    this.handleOpenModal();
  }

  render() {
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
        width: '60%',
      },
    };
    const CatererMealsWithErrorHandling =
      errorHandler(CatererMeals, 'Error fetching meals');
    return (
      <div>
        <main
          className="bg-light main"
          style={{ minHeight: 'calc(100vh - 151px)' }}
        >
          <Button
            value="Add meal"
            className="btn btn-default"
            onClick={this.handleAddMeal}
            style={{ margin: '1rem 1rem 1rem 0' }}
          />
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Meal"
            style={modalStyle}
            closeTimeoutMS={150}
          >
            <Button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            />
            {!this.state.updating
              ? <AddMeal closeModal={this.handleCloseModal} />
              : <UpdateMeal
                meal={this.state.meal}
                closeModal={this.handleCloseModal}
              />}
          </Modal>
          <CatererMealsWithErrorHandling
            handleMealUpdate={this.handleMealUpdate}
            error={this.props.error}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

ConnectedMeals.propTypes = {
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  error: state.meals.fetchError,
});

const Meals = connect(mapStateToProps)(ConnectedMeals);

export default Meals;
