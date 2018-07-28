import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import MealDetail from '../Meals/MealDetail';
import MealCheckout from './MealCheckout';
import SigninSignupButtons from './SigninSignupButtons';
import Button from '../util/Button';


class MenuMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMealDetailOpen: false,
      isMealCheckoutOpen: false,
      meal: props.meal,
    };
    this.handleOpenMealDetailModal =
      this.handleOpenMealDetailModal.bind(this);
    this.handleCloseMealDetailModal =
      this.handleCloseMealDetailModal.bind(this);
    this.handleOpenMealCheckoutModal =
      this.handleOpenMealCheckoutModal.bind(this);
    this.handleCloseMealCheckoutModal =
      this.handleCloseMealCheckoutModal.bind(this);
  }

  handleOpenMealDetailModal() {
    this.setState({ isMealDetailOpen: true });
  }

  handleCloseMealDetailModal() {
    this.setState({ isMealDetailOpen: false });
  }

  handleOpenMealCheckoutModal() {
    this.setState({ isMealCheckoutOpen: true });
  }

  handleCloseMealCheckoutModal() {
    this.setState({ isMealCheckoutOpen: false });
  }

  render() {
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
        width: '70%',
      },
    };
    const mealChoiceModalStyle = {
      ...modalStyle,
      content: { ...modalStyle.content, width: '45%' },
    };
    return (
      <div key={this.state.meal.id} className="card user-menu-item">
        <div
          className="overlay-container"
          onClick={this.handleOpenMealDetailModal}
          onKeyPress={this.handleOpenMealDetailModal}
          role="button"
          tabIndex="0"
        >
          <img
            src={this.state.meal.imageUrl}
            alt={this.state.meal.name}
          />
          <div className="overlay">
            <div className="text">
              <p>View description</p>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isMealDetailOpen}
          contentLabel="Meal Detail"
          style={modalStyle}
          closeTimeoutMS={150}
        >
          <Button
            value="&times;"
            onClick={this.handleCloseMealDetailModal}
            className="close"
          />
          <MealDetail
            closeMealDetail={this.handleCloseMealDetailModal}
            meal={this.state.meal}
          />
        </Modal>
        <div
          className="font-weight-bold text-black"
          style={{ padding: '.875rem' }}
        >
          <p>{this.state.meal.name}</p>
          <p style={{ fontSize: '1.25rem' }}>&#x20a6;{this.state.meal.price}</p>
        </div>
        <Modal
          isOpen={this.state.isMealCheckoutOpen}
          contentLabel="Meal Choice"
          style={mealChoiceModalStyle}
          closeTimeoutMS={150}
        >
          <Button
            value="&times;"
            onClick={this.handleCloseMealCheckoutModal}
            className="close"
          />
          {this.props.loggedIn
            ?
              <MealCheckout
                meal={this.state.meal}
                closeModal={this.handleCloseMealCheckoutModal}
              />
            :
              <SigninSignupButtons
                closeModal={this.handleCloseMealCheckoutModal}
              />
          }
        </Modal>
        <Button
          className="btn btn-default"
          onClick={this.handleOpenMealCheckoutModal}
          value="Order Now"
          style={{ margin: '1rem auto' }}
        />
      </div>
    );
  }
}

MenuMeal.propTypes = {
  meal: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});


export default connect(mapStateToProps)(MenuMeal);
