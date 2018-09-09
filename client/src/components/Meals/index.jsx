import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import swal from 'sweetalert';
import ConnectedCatererMeals from './CatererMeals';
import ConnectedAddMeal from './AddMeal';
import ConnectedUpdateMeal from './UpdateMeal';
import Footer from '../util/Footer';
import Button from '../util/Button';
import errorHandler from '../util/errorHandler';
import { fetchMeals, fetchCatererMeals } from '../../actions/mealActions';
import Paginate from '../util/Paginate';
import {
  getNextPageUrl,
  getPreviousPageUrl, getCurrentPageUrl,
} from '../../reducers/paginationReducer';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

export class Meals extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      updating: false,
      meal: {},
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleMealUpdate = this.handleMealUpdate.bind(this);
    this.handleAddMeal = this.handleAddMeal.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCatererPageChange = this.handleCatererPageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.userRole === 'superAdmin') {
      this.handlePageChange(this.props.currentUrl);
    } else {
      this.handleCatererPageChange(this.props.catererCurrentUrl);
    }
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleMealUpdate(meal) {
    this.setState({ updating: true, meal });
    this.handleOpenModal();
  }

  handleAddMeal() {
    if (this.props.userRole !== 'caterer') {
      swal({
        text: 'You do not have the permission to add a meal',
        icon: 'info',
        className: 'swal-button--confirm',
      });
    } else {
      this.setState({ updating: false });
      this.handleOpenModal();
    }
  }

  handleRetry() {
    this.handlePageChange(this.props.currentUrl);
  }

  handlePageChange(url) {
    this.props.fetchMeals(url);
  }

  handleCatererPageChange(url) {
    this.props.fetchCatererMeals(url);
  }

  render() {
    const { userRole } = this.props;

    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '20rem',
        width: '60%',
      },
    };
    const CatererMealsWithErrorHandling =
      errorHandler(ConnectedCatererMeals, 'Error fetching meals', this.handleRetry, true);

    return (
      <div>
        <main
          className="bg-light main"
          style={{ minHeight: 'calc(100vh - 151px)' }}
        >
          <Button
            value="Add meal"
            className="btn btn-default"
            onClick={this.handleAddMeal}
            style={{ margin: '1rem 1rem 1rem 0' }}
          />
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Meal"
            style={modalStyle}
            closeTimeoutMS={150}
          >
            <Button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            />
            {!this.state.updating
              ? <ConnectedAddMeal closeModal={this.handleCloseModal} />
              : <ConnectedUpdateMeal
                meal={this.state.meal}
                closeModal={this.handleCloseModal}
              />}
          </Modal>
          <CatererMealsWithErrorHandling
            handleMealUpdate={this.handleMealUpdate}
            error={this.props.error}
          />
          <Paginate
            onPageChange={userRole === 'superAdmin'
              ? this.handlePageChange
              : this.handleCatererPageChange
            }
            nextUrl={userRole === 'superAdmin'
              ? this.props.nextUrl
              : this.props.catererNextUrl
            }
            previousUrl={userRole === 'superAdmin'
              ? this.props.previousUrl
              : this.props.catererPreviousUrl
            }
          />
        </main>
        <Footer />
      </div>
    );
  }
}

Meals.propTypes = {
  /* eslint react/require-default-props: 0 */
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
  ]),
  fetchMeals: PropTypes.func.isRequired,
  fetchCatererMeals: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
  catererCurrentUrl: PropTypes.string.isRequired,
  catererNextUrl: PropTypes.string,
  catererPreviousUrl: PropTypes.string,
};

const mapStateToProps = state => ({
  error: state.meals.fetchError,
  userRole: state.user.data.role,
  nextUrl: getNextPageUrl(state.pagination.meals.superAdmin),
  currentUrl: getCurrentPageUrl(state.pagination.meals.superAdmin),
  previousUrl: getPreviousPageUrl(state.pagination.meals.superAdmin),
  catererNextUrl: getNextPageUrl(state.pagination.meals.caterer),
  catererCurrentUrl: getCurrentPageUrl(state.pagination.meals.caterer),
  catererPreviousUrl: getPreviousPageUrl(state.pagination.meals.caterer),
});

export default connect(
  mapStateToProps,
  { fetchMeals, fetchCatererMeals },
)(Meals);
