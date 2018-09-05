import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import OrderList from './OrderList';
import { fetchAllOrders, fetchCatererOrders } from '../../actions/dashboardActions';
import { getOrders, isFetching } from '../../reducers/dashboardReducer';
import Loading from '../util/Loading';
import Paginate from '../util/Paginate';
import {
  getNextPageUrl,
  getPreviousPageUrl, getCurrentPageUrl,
} from '../../reducers/paginationReducer';

export class DashboardOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCatererPageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.userRole === 'superAdmin') {
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
    const { userRole } = this.props;
    if (this.props.isFetching) {
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
        <h5>Order history</h5>
        <OrderList orders={this.props.allOrders} />
        <Paginate
          onPageChange={userRole === 'superAdmin'
            ? this.handlePageChange
            : this.handleCatererPageChange
          }
          nextUrl={userRole === 'superAdmin'
            ? this.props.superAdminNextUrl
            : this.props.catererNextUrl
          }
          previousUrl={userRole === 'superAdmin'
            ? this.props.superAdminPreviousUrl
            : this.props.catererPreviousUrl
          }
          style={{ marginTop: '0' }}
        />
      </section>
    );
  }
}

DashboardOrderHistory.defaultProps = {
  superAdminNextUrl: '',
  superAdminPreviousUrl: '',
  catererNextUrl: '',
  catererPreviousUrl: '',
};

DashboardOrderHistory.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getCatererOrders: PropTypes.func.isRequired,
  allOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRole: PropTypes.string.isRequired,
  superAdminCurrentUrl: PropTypes.string.isRequired,
  catererCurrentUrl: PropTypes.string.isRequired,
  superAdminNextUrl: PropTypes.string,
  superAdminPreviousUrl: PropTypes.string,
  catererNextUrl: PropTypes.string,
  catererPreviousUrl: PropTypes.string,
};

const mapStateToProps = state => ({
  isFetching: isFetching(state.dashboard),
  allOrders: getOrders(state.dashboard),
  userRole: state.user.data.role,
  catererNextUrl: getNextPageUrl(state.pagination.dashboard.caterer),
  catererCurrentUrl: getCurrentPageUrl(state.pagination.dashboard.caterer),
  catererPreviousUrl: getPreviousPageUrl(state.pagination.dashboard.caterer),
  superAdminNextUrl: getNextPageUrl(state.pagination.dashboard.superAdmin),
  superAdminCurrentUrl: getCurrentPageUrl(state.pagination.dashboard.superAdmin),
  superAdminPreviousUrl: getPreviousPageUrl(state.pagination.dashboard.superAdmin),
});


export default connect(
  mapStateToProps,
  {
    getAllOrders: fetchAllOrders,
    getCatererOrders: fetchCatererOrders,
  },
)(DashboardOrderHistory);
