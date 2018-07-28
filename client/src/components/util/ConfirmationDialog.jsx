import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from './Button';

Modal.setAppElement('#root');

const ConfirmationDialog = ({
  message, ok, cancel, isOpen,
}) => {
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
      width: '30%',
    },
  };

  const btnStyle = {
    margin: '1.5rem 1rem 0 1rem',
    padding: '.5rem',
    borderRadius: '2px',
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Confirmation Dialog"
      style={modalStyle}
    >
      <div className="text-center">
        <p>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="btn btn-default"
            value="Ok"
            onClick={ok}
            style={btnStyle}
          />
          <Button
            className="btn btn-default"
            value="Cancel"
            onClick={cancel}
            style={btnStyle}
          />
        </div>
      </div>
    </Modal>
  );
};


ConfirmationDialog.propTypes = {
  message: PropTypes.string.isRequired,
  ok: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ConfirmationDialog;
