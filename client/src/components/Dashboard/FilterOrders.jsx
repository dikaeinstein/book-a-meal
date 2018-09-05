import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../util/Button';
import { fetchAllOrders, fetchCatererOrders } from '../../actions/dashboardActions';
import initialState from '../../reducers/initialState';

export class FilterOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleChange(event) {
    const date = event.target.value;
    this.setState({ date });
  }

  handleFilter() {
    this.setState({ date: '' });
    if (this.props.userRole === 'superAdmin') {
      const url = initialState.pagination.dashboard.superAdmin.currentPage.href;
      this.props.fetchAllOrders(`${url}&date=${this.state.date}`);
    } else {
      const url = initialState.pagination.dashboard.caterer.currentPage.href;
      this.props.fetchCatererOrders(`${url}&date=${this.state.date}`);
    }
  }

  render() {
    return (
      <div className="filter">
        <h6>Pick a date</h6>
        <input
          type="date"
          className="filter-input"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <Button
          className="btn btn-default"
          value="Filter Orders"
          onClick={this.handleFilter}
        />
      </div>
    );
  }
}

FilterOrders.propTypes = {
  userRole: PropTypes.string.isRequired,
  fetchAllOrders: PropTypes.func.isRequired,
  fetchCatererOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userRole: state.user.data.role,
});

export default connect(
  mapStateToProps,
  { fetchAllOrders, fetchCatererOrders },
)(FilterOrders);
