import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedDashboardOrderHistory from './DashboardOrderHistory';
import Footer from '../util/Footer';
import ConnectedFilterOrders from './FilterOrders';
import ConnectedTotalOrders from './TotalOrders';
import ConnectedTotalAmount from './TotalAmount';
import errorHandler from '../util/errorHandler';
import ErrorBoundary from '../util/ErrorBoundary';


export const Dashboard = ({ fetchAllOrdersError }) => {
  const DashboardOrderHistoryWithErrorHandling =
    errorHandler(ConnectedDashboardOrderHistory, 'Error fetching orders');

  return (
    <ErrorBoundary>
      <div>
        <main
          className="dash-main text-center bg-dark-light"
          style={{ minHeight: 'calc(100vh - 151px)' }}
        >
          <h4>Dashboard</h4>
          <section className="card dashboard">
            <ConnectedTotalOrders />
            <ConnectedTotalAmount />
            <ConnectedFilterOrders />
            <DashboardOrderHistoryWithErrorHandling
              error={fetchAllOrdersError}
            />
          </section>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

Dashboard.propTypes = {
  /* eslint react/require-default-props: 0 */
  fetchAllOrdersError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
};

const mapStateToProps = state => ({
  fetchAllOrdersError: state.dashboard.fetchAllOrdersError,
});

export default connect(mapStateToProps)(Dashboard);
