import React from 'react';
import sweetalert from 'sweetalert';
import { shallow } from 'enzyme';
import { UserOrder }
  from '../../../components/UserOrderHistory/UserOrder';
import ConnectedUpdateOrder from '../../../components/UserOrderHistory/UpdateOrder';

jest.mock('sweetalert');

describe('<User />', () => {
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
  it('should call handleOpenModal', () => {
    const spy = jest.spyOn(UserOrder.prototype, 'handleOpenModal');
    const wrapper = shallow(<UserOrder order={order} modifyOrder={jest.fn()} />);
    const openModal = wrapper.find('.action-btn').first();
    openModal.simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().isModalOpen).toBeTruthy();
  });
  it('should call handleCloseModal', () => {
    const spy = jest.spyOn(UserOrder.prototype, 'handleCloseModal');
    const wrapper = shallow(<UserOrder
      order={order}
      modifyOrder={jest.fn()}
    />);
    wrapper.find(ConnectedUpdateOrder).props().closeModal();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().isModalOpen).toBeFalsy();
  });
  it('should call handleCancel', () => {
    sweetalert.mockResolvedValue(Promise.resolve(true));
    const spy = jest.spyOn(UserOrder.prototype, 'handleCancel');
    const wrapper = shallow(<UserOrder
      order={{ ...order, status: 'cancelled' }}
      modifyOrder={jest.fn()}
    />);
    const cancelOrder = wrapper.find('.action-btn').last();
    cancelOrder.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should call handleCancel', () => {
    sweetalert.mockResolvedValue(Promise.reject(new Error()));
    const spy = jest.spyOn(UserOrder.prototype, 'handleCancel');
    const wrapper = shallow(<UserOrder
      order={{ ...order, expired: false, status: 'pending' }}
      modifyOrder={jest.fn()}
    />);
    const cancelOrder = wrapper.find('.action-btn').last();
    cancelOrder.simulate('click');
    sweetalert.mockResolvedValue(Promise.reject());
    cancelOrder.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<UserOrder order={order} modifyOrder={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
