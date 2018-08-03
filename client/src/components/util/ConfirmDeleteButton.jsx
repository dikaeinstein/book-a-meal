import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const ConfirmDeleteButton = ({
  handleOk,
  handleCancel,
  resource,
  ...otherProps
}) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const willDelete = await swal({
        text: `Are you sure you want to delete ${resource}`,
        buttons: true,
        icon: 'warning',
        dangerMode: true,
      });
      if (willDelete) {
        await handleOk();
        swal({
          text: `Successfully deleted ${resource}`,
          icon: 'success',
          className: 'swal-button',
        });
      } else {
        if (handleCancel) {
          handleCancel();
        }
        return;
      }
    } catch (error) {
      swal({
        text: `Error deleting ${resource}`,
        icon: 'error',
      });
    }
  };

  return (
    <button onClick={handleDelete} {...otherProps}>
      Delete
    </button>
  );
};

ConfirmDeleteButton.defaultProps = {
  handleCancel: undefined,
};

ConfirmDeleteButton.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  resource: PropTypes.string.isRequired,
};

export default ConfirmDeleteButton;
