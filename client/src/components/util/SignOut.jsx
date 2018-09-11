import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeUser } from '../../helpers/persistUser';
import { userSignOut } from '../../actions/userActions';

export class SignOut extends Component {
  componentDidMount() {
    userSignOut();
    removeUser();
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

SignOut.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect(null, { userSignOut })(SignOut);
