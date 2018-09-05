import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { removeUser } from '../../helpers/persistUser';
import history from '../../helpers/history';
import { userSignOut } from '../../actions/userActions';
import { getUser } from '../../reducers/userReducer';

export const Navigation = ({ urls, signout, userName }) => {
  const handleSignout = () =>
    swal({
      text: 'Are you sure you want to leave this page?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willLeave) => {
        if (willLeave) {
          signout();
          removeUser();
          history.push('/');
        }
      });

  const urlList = urls.map((url) => {
    if (url.link === 'signout') {
      return (
        <li
          key={url.id}
          onClick={handleSignout}
          onKeyDown={handleSignout}
        >
          {url.name}
        </li>
      );
    }

    if (url.link && (url.name === 'Customer' || url.name === 'Caterer')) {
      return (
        <li key={url.id}>
          <i className="fas fa-user-circle" />
          {' '}
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

Navigation.defaultProps = {
  userName: '',
};

Navigation.propTypes = {
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

export default connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(Navigation);
