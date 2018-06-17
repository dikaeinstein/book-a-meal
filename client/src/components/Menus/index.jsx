import React, { Component } from 'react';
import Modal from 'react-modal';
import Menu from './Menu';
import Button from '../util/Button';
import Footer from '../util/Footer';

class Menus extends Component {
  constructor(props) {
    super(props);
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
    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
      content: {
        width: '50%',
        margin: '4rem auto',
      },
    };
    return (
      <div>
        <main className="bg-light text-dark" style={{ padding: '2rem' }}>
          <Button
            className="btn btn-default"
            style={{ margin: '2rem 2rem 0 2rem' }}
            value="Set Up Menu"
            onClick={this.handleOpenModal}
          />
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Menu"
            style={modalStyle}
          >
            <Button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            />
          </Modal>
          <Menu />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Menus;
