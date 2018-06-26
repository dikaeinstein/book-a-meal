import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import errorHandler from '../util/errorHandler';
import MealsCheckBoxForm from './MealsCheckBoxForm';
import { setupMenu } from '../../actions/menuActions';

const ConnectedSetupMenu = ({ error, setMenu }) => {
  const MealsCheckboxFormWithErrorHandling =
    errorHandler(
      MealsCheckBoxForm,
      'Error fetching meals',
    );

  const handleSubmit = (values) => {
    setMenu(values);
  };

  return (
    <section className="add-section">
      <h2 className="text-dark text-center">Set Up Menu</h2>
      <MealsCheckboxFormWithErrorHandling
        error={error}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

ConnectedSetupMenu.propTypes = {
  setMenu: PropTypes.func.isRequired,
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  error: state.menus.saveError,
});

const mapDispatchToProps = dispatch => ({
  setMenu: values => dispatch(setupMenu(values)),
});

const SetupMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedSetupMenu);

export default SetupMenu;
