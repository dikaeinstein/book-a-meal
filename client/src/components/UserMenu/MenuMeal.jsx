import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
      isMealChoiceOpen: false,
      meal: props.meal,
    };
    this.handleOpenMealDetailModal =
      this.handleOpenMealDetailModal.bind(this);
    this.handleCloseMealDetailModal =
      this.handleCloseMealDetailModal.bind(this);
    this.handleOpenMealChoiceModal =
      this.handleOpenMealChoiceModal.bind(this);
    this.handleCloseMealChoiceModal =
      this.handleCloseMealChoiceModal.bind(this);
  }

  handleOpenMealDetailModal() {
    this.setState({ isMealDetailOpen: true });
  }

  handleCloseMealDetailModal() {
    this.setState({ isMealDetailOpen: false });
  }

  handleOpenMealChoiceModal() {
    this.setState({ isMealChoiceOpen: true });
  }

  handleCloseMealChoiceModal() {
    this.setState({ isMealChoiceOpen: false });
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
      content: { ...modalStyle.content, width: '50%' },
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
        <p className="text-black">{this.state.meal.name}</p>
        <p className="text-black">&#x20a6;{this.state.meal.price}</p>
        <Modal
          isOpen={this.state.isMealChoiceOpen}
          contentLabel="Meal Choice"
          style={mealChoiceModalStyle}
          closeTimeoutMS={150}
        >
          <Button
            value="&times;"
            onClick={this.handleCloseMealChoiceModal}
            className="close"
          />
          {this.props.loggedIn
            ?
              <MealCheckout
                meal={this.state.meal}
                closeModal={this.handleCloseMealChoiceModal}
              />
            :
              <SigninSignupButtons
                closeModal={this.handleCloseMealChoiceModal}
              />
          }
        </Modal>
        <Button
          className="btn btn-default"
          onClick={this.handleOpenMealChoiceModal}
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
