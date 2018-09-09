import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Loading from '../util/Loading';
import { getMenu } from '../../reducers/menuReducer';
import MenuMeals from './MenuMeals';
import Paginate from '../util/Paginate';
import {
  getNextPageUrl,
  getPreviousPageUrl, getCurrentPageUrl,
} from '../../reducers/paginationReducer';
import { fetchMenu } from '../../actions/menuActions';

export class Menu extends Component {
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
    const { isFetching } = this.props;
    const name = this.props.menu.name.includes('Menu for Today')
      ? `Menu for Today ${(new Date()).toDateString()}`
      : this.props.menu.name;

    return (
      <section className="menu landing-main">
        <h4 className="text-center">{name}</h4>
        <div className="card menu-card table-scroll">
          {isFetching
            ?
              <Loading text="fetching meals...">
                <Preloader size="medium" flashing />
              </Loading>
            : <MenuMeals meals={this.props.menu.meals} />}
          <Paginate
            onPageChange={this.handlePageChange}
            nextUrl={this.props.nextUrl}
            previousUrl={this.props.previousUrl}
            style={{ marginTop: '0' }}
          />
        </div>
      </section>
    );
  }
}

Menu.defaultProps = {
  nextUrl: '',
  previousUrl: '',
};

Menu.propTypes = {
  menu: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.number,
  ])).isRequired,
  isFetching: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
  fetchMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menu: getMenu(state.menu),
  isFetching: state.menu.isFetching,
  nextUrl: getNextPageUrl(state.pagination.menu),
  currentUrl: getCurrentPageUrl(state.pagination.menu),
  previousUrl: getPreviousPageUrl(state.pagination.menu),
});

export default connect(mapStateToProps, { fetchMenu })(Menu);
