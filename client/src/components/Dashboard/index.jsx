import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardOrderHistory from './DashboardOrderHistory';
import Footer from '../util/Footer';
import FilterOrders from './FilterOrders';
import TotalOrders from './TotalOrders';
import TotalSales from './TotalSales';
import errorHandler from '../util/errorHandler';


const ConnectedDashboard = ({ fetchOrdersError }) => {
  const DashboardOrderHistoryWithErrorHandling =
    errorHandler(DashboardOrderHistory, 'Error fetching orders');

  return (
    <div>
      <main className="bg-light dash-main text-center">
        <h1 className="text-dark">Dashboard</h1>
        <section className="card dashbord">
          <TotalOrders />
          <TotalSales />
          <FilterOrders />
          <DashboardOrderHistoryWithErrorHandling
            error={fetchOrdersError}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  fetchOrdersError: state.orders.error,
});

const Dashboard = connect(mapStateToProps)(ConnectedDashboard);

export default Dashboard;
