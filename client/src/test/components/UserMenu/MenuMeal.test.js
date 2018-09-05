import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedMenuMeal, { MenuMeal }
  from '../../../components/UserMenu/MenuMeal';
import ConnectedMealCheckout from '../../../components/UserMenu/MealCheckout';
import SigninSignupButtons from '../../../components/UserMenu/SigninSignupButtons';
import Button from '../../../components/util/Button';

describe('<MenuMeal />', () => {
  let meal;
  let wrapper;
  beforeAll(() => {
    meal = {
      id: 1,
      name: 'test meal',
      price: 2000,
      user: { id: 1, name: 'Dika Test' },
      imageUrl: 'http://testurl.com/image.jpg',
    };

    wrapper = shallow(<MenuMeal defaultMeal={meal} loggedIn />);
  });
  it('should call handleOpenMealDetail', () => {
    const spyOn = jest.spyOn(MenuMeal.prototype, 'handleOpenMealDetailModal');
    wrapper = shallow(<MenuMeal defaultMeal={meal} loggedIn />);
    const overlayContainer = wrapper.find('.overlay-container');
    overlayContainer.simulate('click');
    expect(spyOn).toHaveBeenCalled();
    expect(wrapper.state().isMealDetailOpen).toBeTruthy();
  });
  it('should call handleCloseMealDetailModal', () => {
    const spyOn = jest.spyOn(MenuMeal.prototype, 'handleCloseMealDetailModal');
    wrapper = shallow(<MenuMeal defaultMeal={meal} loggedIn />);
    const close = wrapper.find(Button).first();
    close.simulate('click');
    expect(spyOn).toHaveBeenCalled();
    expect(wrapper.state().isMealDetailOpen).toBeFalsy();
  });
  it('should call handleOpenMealCheckoutModal', () => {
    const spyOn = jest.spyOn(MenuMeal.prototype, 'handleOpenMealCheckoutModal');
    wrapper = shallow(<MenuMeal defaultMeal={meal} loggedIn />);
    const orderNow = wrapper.find(Button).last();
    orderNow.simulate('click');
    expect(spyOn).toHaveBeenCalled();
    expect(wrapper.state().isMealCheckoutOpen).toBeTruthy();
  });
  it('should call handleCloseMealCheckoutModal', () => {
    const spyOn = jest.spyOn(MenuMeal.prototype, 'handleCloseMealCheckoutModal');
    wrapper = shallow(<MenuMeal defaultMeal={meal} loggedIn />);
    wrapper.find(ConnectedMealCheckout).props().closeModal();
    expect(spyOn).toHaveBeenCalled();
    expect(wrapper.state().isMealCheckoutOpen).toBeFalsy();
  });
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ user: { loggedIn: false } });
    wrapper = shallow(<ConnectedMenuMeal store={store} defaultMeal={meal} />);
    expect(wrapper.props().loggedIn).toBeFalsy();
  });
  it('should render SigninSignup', () => {
    wrapper = shallow(<MenuMeal defaultMeal={meal} loggedIn={false} />);
    expect(wrapper.find(SigninSignupButtons).length).toBe(1);
  });
  it('should match snapshot', () => {
    const tree = shallow(<MenuMeal defaultMeal={meal} loggedIn />);
    expect(tree).toMatchSnapshot();
  });
});
