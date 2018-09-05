import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedDashboardOrderHistory, { DashboardOrderHistory }
  from '../../../components/Dashboard/DashboardOrderHistory';
import initialState from '../../../reducers/initialState';

describe('<DashboardHistory />', () => {
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
  const props = {
    isFetching: false,
    getAllOrders: jest.fn(),
    getCatererOrders: jest.fn(),
    allOrders: [order],
    userRole: 'superAdmin',
    superAdminCurrentUrl: 'http://testurl',
    catererCurrentUrl: 'http://testurl',
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedDashboardOrderHistory
      {...props}
      store={store}
    />);
    expect(wrapper.props().isFetching).toBeFalsy();
  });
  it('should match snapshot', () => {
    let tree = shallow(<DashboardOrderHistory {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<DashboardOrderHistory
      {...{ ...props, userRole: 'caterer' }}
    />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<DashboardOrderHistory
      {...{ ...props, isFetching: true }}
    />);
    expect(tree).toMatchSnapshot();
  });
});
