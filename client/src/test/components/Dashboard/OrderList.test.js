import React from 'react';
import { shallow } from 'enzyme';
import OrderList from '../../../components/Dashboard/OrderList';

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
  it('match should snapshot', () => {
    const tree = shallow(<OrderList orders={orders} />);
    expect(tree).toMatchSnapshot();
  });
});
