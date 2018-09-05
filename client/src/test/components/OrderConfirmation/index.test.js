import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedOrderConfirmation, { OrderConfirmation }
  from '../../../components/OrderConfirmation';
import Button from '../../../components/util/Button';

describe('<OrderConfirmation />', () => {
  const props = {
    orderMeal: jest.fn(),
    checkedOutOrder: {
      name: 'Test meal',
      quantity: 3,
      total: 6000,
    },
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({
      orders: {
        checkedOutOrder: {
          name: 'Test meal',
          quantity: 3,
          total: 6000,
        },
      },
    });
    const wrapper = shallow(<ConnectedOrderConfirmation store={store} />);
    expect(wrapper.props().checkedOutOrder).toEqual(props.checkedOutOrder);
  });
  it('should navigate to previous page when goBack is clicked', () => {
    const wrapper = shallow(<OrderConfirmation {...props} />);
    wrapper.find(Button).first().simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleConfirmOrder when confirmOrder is clicked', () => {
    const wrapper = shallow(<OrderConfirmation {...props} />);
    wrapper.find(Button).last().simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should match snapshot', () => {
    const tree = shallow(<OrderConfirmation
      {...{ ...props, checkedOutOrder: { quantity: 1 } }}
    />);
    expect(tree).toMatchSnapshot();
  });
});
