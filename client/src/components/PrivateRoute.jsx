import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PrivateRoute = ({
  loggedIn, userRole, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
    loggedIn && userRole === 'customer' ?
      <Component {...props} />
      :
      <Redirect to="/signin" />)}
  />
);

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  userRole: state.user.data.role,
});

export default connect(mapStateToProps)(PrivateRoute);
