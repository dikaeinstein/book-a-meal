import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Logo from './Logo';
import Navigation from './Navigation';

const Header = ({ className }) => {
  const toggleNavbar = () => {
    const navContainer = document
      .getElementsByClassName('nav-container')[0];
    navContainer.classList.toggle('navbar-toggle-show');
  };

  return (
    <header className={className}>
      <ToastContainer />
      <Logo
        text="Book-A-Meal"
        className="col-1-4 logo text-left"
      />
      <div
        className="toggle-show"
        onClick={toggleNavbar}
        onKeyPress={toggleNavbar}
        role="button"
        tabIndex="0"
      >
        &#9776;
      </div>
      <Navigation />
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Header;
