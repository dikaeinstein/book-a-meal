import React from 'react';
import { shallow } from 'enzyme';
import { MealCheckout } from '../../../components/UserMenu/MealCheckout';
import Button from '../../../components/util/Button';


describe('<MealCheckout />', () => {
  const closeModal = jest.fn();
  it('should handle order checkout', () => {
    const checkoutOrder = jest.fn();
    const wrapper = shallow(<MealCheckout
      defaultMeal={{ price: 3000 }}
      closeModal={closeModal}
      checkoutOrder={checkoutOrder}
    />);
    const checkout = wrapper.find(Button);
    checkout.simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
  it('should handle meal quantity change', () => {
    const checkoutOrder = jest.fn();
    const wrapper = shallow(<MealCheckout
      defaultMeal={{ price: 3000 }}
      closeModal={closeModal}
      checkoutOrder={checkoutOrder}
    />);
    expect(wrapper.state().total).toEqual(3000);
    expect(wrapper.state().quantity).toEqual(1);
    wrapper.find('#quantity').simulate('change', {
      preventDefault: jest.fn(),
      target: { value: 2 },
    });
    expect(wrapper.state().total).toEqual(6000);
    expect(wrapper.state().quantity).toEqual(2);
  });
  it('should match snapshot', () => {
    const checkoutOrder = jest.fn();
    const tree = shallow(<MealCheckout
      defaultMeal={{ price: 3000 }}
      closeModal={jest.fn()}
      checkoutOrder={checkoutOrder}
    />);
    expect(tree).toMatchSnapshot();
  });
});
