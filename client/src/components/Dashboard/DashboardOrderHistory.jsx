import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import OrderList from './OrderList';
import { fetchAllOrders, fetchCatererOrders } from '../../actions/dashboardActions';
import { getOrders } from '../../reducers/dashboardReducer';
import Loading from '../util/Loading';
import Paginate from '../util/Paginate';
import {
  getNextPageUrl,
  getPreviousPageUrl, getCurrentPageUrl,
} from '../../reducers/paginationReducer';

class ConnectedDashboardOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCatererPageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.role === 'superAdmin') {
      this.handlePageChange(this.props.superAdminCurrentUrl);
    } else {
      this.handleCatererPageChange(this.props.catererCurrentUrl);
    }
  }

  handleCatererPageChange(url) {
    this.props.getCatererOrders(url);
  }

  handlePageChange(url) {
    this.props.getAllOrders(url);
  }

  render() {
    const { isFetching, role } = this.props;
    if (isFetching) {
      return (
        <div className="loader-container">
          <Loading text="fetching orders...">
            <Preloader flashing size="medium" />
          </Loading>
        </div>
      );
    }

    return (
      <section>
        <h2>Order history</h2>
        <OrderList orders={this.props.allOrders} />
        <Paginate
          onPageChange={role === 'superAdmin'
            ? this.handlePageChange
            : this.handleCatererPageChange
          }
          nextUrl={role === 'superAdmin'
            ? this.props.superAdminNextUrl
            : this.props.catererNextUrl
          }
          previousUrl={role === 'superAdmin'
            ? this.props.superAdminPreviousUrl
            : this.props.catererPreviousUrl
          }
          style={{ marginTop: '0' }}
        />
      </section>
    );
  }
}

ConnectedDashboardOrderHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getCatererOrders: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  role: PropTypes.string.isRequired,
  superAdminCurrentUrl: PropTypes.string.isRequired,
  catererCurrentUrl: PropTypes.string.isRequired,
  superAdminNextUrl: PropTypes.string.isRequired,
  superAdminPreviousUrl: PropTypes.string.isRequired,
  catererNextUrl: PropTypes.string.isRequired,
  catererPreviousUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.dashboard.isFetchingAllOrders,
  allOrders: getOrders(state.dashboard),
  role: state.user.data.role,
  catererNextUrl: getNextPageUrl(state.pagination.dashboard.caterer),
  catererCurrentUrl: getCurrentPageUrl(state.pagination.dashboard.caterer),
  catererPreviousUrl: getPreviousPageUrl(state.pagination.dashboard.caterer),
  superAdminNextUrl: getNextPageUrl(state.pagination.dashboard.superAdmin),
  superAdminCurrentUrl: getCurrentPageUrl(state.pagination.dashboard.superAdmin),
  superAdminPreviousUrl: getPreviousPageUrl(state.pagination.dashboard.superAdmin),
});

const mapDispatchToProps = dispatch => ({
  getAllOrders(url) { dispatch(fetchAllOrders(url)); },
  getCatererOrders(url) { dispatch(fetchCatererOrders(url)); },
});

const DashboardOrderHistory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedDashboardOrderHistory);

export default DashboardOrderHistory;
