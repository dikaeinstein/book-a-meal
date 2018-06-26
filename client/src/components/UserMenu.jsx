import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuCard from './MenuCard';
import Footer from './util/Footer';
import errorHandler from './util/errorHandler';

const ConnectedUserMenu = ({ fetchMenuError }) => {
  const MenuCardWithErrorHandling =
    errorHandler(MenuCard, 'Error fetching menu');

  return (
    <div>
      <MenuCardWithErrorHandling
        link="/order-confirmation"
        error={fetchMenuError}
      />
      <Footer />
    </div>
  );
};

ConnectedUserMenu.propTypes = {
  /* eslint react/require-default-props: 0 */
  fetchMenuError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  fetchMenuError: state.menus.fetchError,
});

const UserMenu = connect(mapStateToProps)(ConnectedUserMenu);

export default UserMenu;
