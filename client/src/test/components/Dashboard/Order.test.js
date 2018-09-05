import React from 'react';
import { shallow } from 'enzyme';
import sweetalert from 'sweetalert';
import configureStore from 'redux-mock-store';
import ConnectedOrder, { Order } from '../../../components/Dashboard/Order';

jest.mock('sweetalert');

describe('<Order />', () => {
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
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ dashboard: { isUpdating: false } });
    const wrapper = shallow(<ConnectedOrder
      store={store}
      order={order}
    />);
    expect(wrapper.props().isUpdating).toBeFalsy();
  });
  it('should call handleCancel when order is cancelled', () => {
    const modifyOrder = jest.fn();
    const wrapper = shallow(<Order
      modifyOrder={modifyOrder}
      order={order}
    />);
    const cancelOrder = wrapper.find('.action-btn').last();
    sweetalert.mockResolvedValue(Promise.resolve(true));
    cancelOrder.simulate('click');
    expect(wrapper).toMatchSnapshot();
    sweetalert.mockResolvedValue(Promise.reject(new Error()));
    cancelOrder.simulate('click');
    expect(wrapper).toMatchSnapshot();
    sweetalert.mockResolvedValue(Promise.reject());
    cancelOrder.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleDeliver when order is delivered', () => {
    const modifyOrder = jest.fn();
    const wrapper = shallow(<Order
      modifyOrder={modifyOrder}
      order={order}
    />);
    const deliverOrder = wrapper.find('.action-btn').first();
    sweetalert.mockResolvedValue(Promise.resolve(true));
    deliverOrder.simulate('click');
    expect(wrapper).toMatchSnapshot();
    sweetalert.mockResolvedValue(Promise.reject(new Error()));
    deliverOrder.simulate('click');
    expect(wrapper).toMatchSnapshot();
    sweetalert.mockResolvedValue(Promise.reject());
    deliverOrder.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should match snapshot', () => {
    let tree = shallow(<Order order={order} modifyOrder={jest.fn()} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Order
      order={{ ...order, status: 'cancelled' }}
      modifyOrder={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Order
      order={{ ...order, status: 'pending' }}
      modifyOrder={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Order
      order={{
        ...order,
        user: { name: '' },
        meal: { name: '', price: '' },
      }}
      modifyOrder={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
  });
});
