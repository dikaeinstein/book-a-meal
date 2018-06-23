import React from 'react';
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
    console.log(values);
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
