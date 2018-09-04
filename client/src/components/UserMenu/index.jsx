import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedMenuCard from './MenuCard';
import Footer from '../util/Footer';
import errorHandler from '../util/errorHandler';

export const UserMenu = ({ fetchMenuError }) => {
  const MenuCardWithErrorHandling =
    errorHandler(ConnectedMenuCard, 'Error fetching menu');

  return (
    <div>
      <div className="landing-main bg-light">
        <main style={{ minHeight: 'calc(93vh - 151px)' }}>
          <MenuCardWithErrorHandling
            link="/order-confirmation"
            error={fetchMenuError}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

UserMenu.propTypes = {
  /* eslint react/require-default-props: 0 */
  fetchMenuError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  fetchMenuError: state.menu.fetchError,
});

export default connect(mapStateToProps)(UserMenu);
