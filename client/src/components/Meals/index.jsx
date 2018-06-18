import React, { Component } from 'react';
import Modal from 'react-modal';
import CatererMeals from './CatererMeals';
import AddMeal from './AddMeal';
import UpdateMeal from './UpdateMeal';
import Footer from '../util/Footer';
import Button from '../util/Button';

Modal.setAppElement('#root');

class Meals extends Component {
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
        width: '40%',
        margin: '4rem auto',
      },
    };
    return (
      <div>
        <main className="bg-light" style={{ padding: '2rem' }}>
          <Button
            value="Add meal"
            className="btn btn-default"
            onClick={this.handleAddMeal}
            style={{ margin: '2rem 2rem 0 2rem' }}
          />
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Meal"
            style={modalStyle}
          >
            <Button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            />
            { !this.state.updating
              ? <AddMeal closeModal={this.handleCloseModal} />
              : <UpdateMeal meal={this.state.meal} />}
          </Modal>
          <CatererMeals handleMealUpdate={this.handleMealUpdate} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Meals;
