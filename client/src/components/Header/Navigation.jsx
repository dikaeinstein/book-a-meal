import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeUser } from '../../helpers/persistUser';
import history from '../../helpers/history';
import { userSignOut } from '../../actions/userActions';

const ConnectedNavigation = ({ urls, signout }) => {
  const handleSignout = (event) => {
    event.preventDefault();
    signout();
    removeUser();
    history.push('/');
  };

  const urlList = urls.map(url => (
    url.link === 'signout'
      ? (
        <li key={url.id}>
          <NavLink
            to={`/${url.link}`}
            onClick={handleSignout}
          >
            {url.name}
          </NavLink>
        </li>
      )
      : (
        <li key={url.id}>
          <NavLink
            to={`/${url.link}`}
          >{url.name}
          </NavLink>
        </li>
      )));

  return (
    <nav className="col-3-4">
      <ul className="nav-container text-center">
        {urlList}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  urls: state.urls,
});

const mapDispatchToProps = dispatch => ({
  signout() { dispatch(userSignOut()); },
});

ConnectedNavigation.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
  signout: PropTypes.func.isRequired,
};

const Navigation = connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(ConnectedNavigation);

export default Navigation;
