import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedOrderHistory, { OrderHistory }
  from '../../../components/UserOrderHistory/OrderHistory';


describe('<OrderHistory />', () => {
  const orders = [
    {
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
    },
  ];
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({
      orders: {
        byId: { 11: { ...orders } },
        allIds: [11],
      },
    });
    const wrapper = shallow(<ConnectedOrderHistory store={store} />);
    expect(wrapper.props().orders.length).toBe(1);
  });
  it('should match snapshot', () => {
    const tree = shallow(<OrderHistory orders={orders} />);
    expect(tree).toMatchSnapshot();
  });
});
