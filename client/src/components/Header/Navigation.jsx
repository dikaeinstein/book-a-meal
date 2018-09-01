import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeUser } from '../../helpers/persistUser';
import history from '../../helpers/history';
import { userSignOut } from '../../actions/userActions';
import { getUser } from '../../reducers/userReducer';

const ConnectedNavigation = ({ urls, signout, userName }) => {
  const handleSignout = (event) => {
    event.preventDefault();
    signout();
    removeUser();
    history.push('/');
  };

  const urlList = urls.map((url) => {
    if (url.link === 'signout') {
      return (
        <li key={url.id}>
          <NavLink
            to={`/${url.link}`}
            onClick={handleSignout}
          >
            {url.name}
          </NavLink>
        </li>
      );
    }

    if (url.link && (url.name === 'Customer' || url.name === 'Caterer')) {
      return (
        <li key={url.id}>
          {userName.split(' ')[0]}
        </li>
      );
    }

    return (
      <li key={url.id}>
        <NavLink
          to={`/${url.link}`}
        >{url.name}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="col-3-4">
      <ul className="nav-container text-center">
        {urlList}
      </ul>
    </nav>
  );
};

ConnectedNavigation.defaultProps = {
  userName: '',
};

ConnectedNavigation.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
  signout: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

const mapStateToProps = state => ({
  urls: state.urls,
  userName: getUser(state.user).name,
});

const mapDispatchToProps = dispatch => ({
  signout() { dispatch(userSignOut()); },
});

const Navigation = connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(ConnectedNavigation);

export default Navigation;
