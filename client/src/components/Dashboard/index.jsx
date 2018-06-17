import React from 'react';
import OrderHistory from './DashboardOrderHistory';
import Footer from '../util/Footer';
import FilterOrders from './FilterOrders';
import TotalOrders from './TotalOrders';
import TotalSales from './TotalSales';

const Dashboard = () => (
  <div>
    <main className="bg-light dash-main text-center">
      <h1 className="text-dark">Dashboard</h1>
      <section className="card dashbord">
        <TotalOrders />
        <TotalSales />
        <FilterOrders />
        <OrderHistory />
      </section>
    </main>
    <Footer />
  </div>
);

export default Dashboard;
