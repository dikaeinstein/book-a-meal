import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ConnectedSignOut from './SignOut';

export const PrivateRoute = ({
  loggedIn, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
    loggedIn ?
      <Component {...props} />
      :
      <ConnectedSignOut><Redirect to="/signin" /></ConnectedSignOut>)}
  />
);

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
