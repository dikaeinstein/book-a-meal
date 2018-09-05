import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import { fetchMenu } from '../../actions/menuActions';
import ConnectedMealList from './MealList';
import Loading from '../util/Loading';
import Paginate from '../util/Paginate';
import {
  getNextPageUrl,
  getPreviousPageUrl, getCurrentPageUrl,
} from '../../reducers/paginationReducer';

export class MenuCard extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.handlePageChange(this.props.currentUrl);
  }

  handlePageChange(url) {
    this.props.fetchMenu(url);
  }

  render() {
    const { isFetching, link } = this.props;
    if (isFetching) {
      return (
        <div className="loader-container">
          <Loading text="fetching menu...">
            <Preloader flashing size="medium" />
          </Loading>
        </div>
      );
    }

    return (
      <section className="main" id="menu">
        <h4 className="text-center">
          Menu for Today {(new Date()).toDateString()}
        </h4>
        <ConnectedMealList link={link} />
        <Paginate
          onPageChange={this.handlePageChange}
          nextUrl={this.props.nextUrl}
          previousUrl={this.props.previousUrl}
          style={{ marginTop: '0' }}
        />
      </section>
    );
  }
}

MenuCard.defaultProps = {
  nextUrl: '', previousUrl: '',
};

MenuCard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchMenu: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
};

const mapStateToProps = state => ({
  isFetching: state.menu.isFetching,
  nextUrl: getNextPageUrl(state.pagination.menu),
  currentUrl: getCurrentPageUrl(state.pagination.menu),
  previousUrl: getPreviousPageUrl(state.pagination.menu),
});

export default connect(mapStateToProps, { fetchMenu })(MenuCard);
