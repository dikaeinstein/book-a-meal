import React, { Component } from 'react';
import Modal from 'react-modal';
import CatererMeals from './CatererMeals';
import AddMeal from './AddMeal';
import Footer from '../Footer';
import Button from '../util/Button';


Modal.setAppElement('#root');

class Meals extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const style = {
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
            onClick={this.handleOpenModal}
          />
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add Meal"
            style={style}
          >
            <Button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            />
            <AddMeal />
          </Modal>
          <CatererMeals />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Meals;
