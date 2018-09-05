import React from 'react';
import { shallow } from 'enzyme';
import OrderList from '../../../components/UserOrderHistory/OrderList';


describe('<OrderList />', () => {
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
  it('should match snapshot', () => {
    const tree = shallow(<OrderList orders={orders} />);
    expect(tree).toMatchSnapshot();
  });
});
