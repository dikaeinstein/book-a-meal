import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IntroBanner from './IntroBanner';
import ConnectedMenuCard from '../UserMenu/MenuCard';
import errorHandler from '../util/errorHandler';
import Footer from '../util/Footer';

export const HomePage = ({ error }) => {
  const MenuCardWithErrorHandling =
    errorHandler(ConnectedMenuCard, 'Error fetching menu');

  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 151px)' }}>
        <IntroBanner />
        <MenuCardWithErrorHandling
          link="/signIn"
          error={error}
        />
      </div>
      <Footer />
    </div>
  );
};

HomePage.propTypes = {
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  error: state.menu.fetchError,
});

export default connect(mapStateToProps)(HomePage);
