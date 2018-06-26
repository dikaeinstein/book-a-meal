import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Menu from './Menu';
import Button from '../util/Button';
import Footer from '../util/Footer';
import SetupMenu from './SetupMenu';
import errorHandler from '../util/errorHandler';

class ConnectedMenus extends Component {
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

    const MenuWithErrorHandling = errorHandler(Menu, 'Error fetching menu');

    return (
      <div>
        <main className="bg-light text-dark" style={{ padding: '2rem' }}>
          <Button
            className="btn btn-alt"
            style={{ margin: '2rem 2rem 0 2rem' }}
            value="Set Up Menu"
            onClick={this.handleOpenModal}
            disabled={this.props.isSet}
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
            <SetupMenu />
          </Modal>
          <MenuWithErrorHandling error={this.props.fetchMenuError} />
        </main>
        <Footer />
      </div>
    );
  }
}

ConnectedMenus.propTypes = {
  /* eslint react/require-default-props: 0 */
  fetchMenuError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  isSet: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  fetchMenuError: state.menus.fetchError,
  isSet: state.menus.isSet,
});

const Menus = connect(mapStateToProps)(ConnectedMenus);

export default Menus;
