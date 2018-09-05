import React from 'react';
import { shallow } from 'enzyme';
import sweetalert from 'sweetalert';
import configureStore from 'redux-mock-store';
import ConnectedUpdateOrder, { UpdateOrder } from
  '../../../components/UserOrderHistory/UpdateOrder';
import Button from '../../../components/util/Button';


jest.mock('sweetalert');

describe('<UpdateOrder />', () => {
  const order = {
    id: 11,
    quantity: 1,
    total: '4000',
    status: 'delivered',
    expired: false,
    mealId: 3,
    userId: 4,
    meal: {
      id: 3,
      name: 'Amala and Ewedu',
      price: '4000',
    },
    user: {
      id: 4,
      name: 'Chinonso Okorie',
    },
  };
  let wrapper;
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ orders: { isUpdating: false } });
    wrapper = shallow(<ConnectedUpdateOrder
      store={store}
      defaultOrder={order}
      closeModal={jest.fn()}
    />);
    expect(wrapper.props().isUpdating).toBeFalsy();
  });
  it('should call handleChange', () => {
    const spy = jest.spyOn(UpdateOrder.prototype, 'handleChange');
    wrapper = shallow(<UpdateOrder
      defaultOrder={order}
      closeModal={jest.fn()}
      modifyOrder={jest.fn()}
    />);
    const quantity = wrapper.find('#quantity');
    quantity.simulate('change', {
      preventDefault: jest.fn(),
      target: { value: 2 },
    });
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().quantity).toBe(2);
  });
  it('should call handleQuantityUpdate', () => {
    const spy = jest.spyOn(UpdateOrder.prototype, 'handleQuantityUpdate');
    sweetalert.mockResolvedValue(Promise.resolve(true));
    wrapper = shallow(<UpdateOrder
      defaultOrder={order}
      closeModal={jest.fn()}
      modifyOrder={jest.fn()}
    />);
    wrapper.find(Button).first().simulate('click');
    sweetalert.mockResolvedValue(Promise.reject());
    wrapper.find(Button).first().simulate('click');
    sweetalert.mockResolvedValue(Promise.reject(new Error()));
    wrapper.find(Button).first().simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<UpdateOrder
      defaultOrder={order}
      closeModal={jest.fn()}
      modifyOrder={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
  });
});
