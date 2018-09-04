import React from 'react';
import { shallow } from 'enzyme';
import sweetAlert from 'sweetalert';
import { NavLink } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedNavigation, { Navigation } from '../../../components/Header/Navigation';

jest.mock('sweetalert');
const signout = jest.fn();
sweetAlert.mockResolvedValue(Promise.resolve(true));

const urls = [
  {
    id: 1,
    name: 'Sign in',
    link: 'signin',
  },
  {
    id: 2,
    name: 'Sign up',
    link: 'signup',
  },
];

const customerUrls = [
  {
    id: 1,
    name: 'Menu',
    link: 'user-menu',
  },
  {
    id: 2,
    name: 'Orders',
    link: 'user-order-history',
  },
  {
    id: 3,
    name: 'Customer',
    link: 'user-details',
  },
  {
    id: 4,
    name: 'Logout',
    link: 'signout',
  },
];

const adminUrls = [
  {
    id: 1,
    name: 'Dashboard',
    link: 'dashboard',
  },
  {
    id: 2,
    name: 'Meals',
    link: 'meals',
  },
  {
    id: 3,
    name: 'Menus',
    link: 'menus',
  },
  {
    id: 4,
    name: 'Caterer',
    link: 'user-details',
  },
  {
    id: 5,
    name: 'Logout',
    link: 'signout',
  },
];

describe('<Navigation />', () => {
  beforeEach(() => {
    // values stored in tests will also be
    // available in other tests unless you run
    localStorage.clear();
  });
  it('should render 2 "NavLink"', () => {
    const userName = 'Dika';
    const wrapper = shallow(<Navigation
      urls={urls}
      userName={userName}
      signout={signout}
    />);
    expect(wrapper.find(NavLink).length).toEqual(urls.length);
  });
  it('should render NavLink with correct props', () => {
    const initialState = { urls: adminUrls, user: { data: { name: 'Dika Test' } } };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    const wrapper = shallow(<ConnectedNavigation
      store={store}
    />);
    wrapper.dive().find('li').last().simulate('click');
    expect(wrapper.props().urls).toEqual(adminUrls);
    expect(wrapper.props().userName).toEqual('Dika Test');
    expect(wrapper.props().signout).toBeDefined();
  });
  it('should render 3 "NavLink"', () => {
    const userName = 'Dika';
    const wrapper = shallow(<Navigation
      urls={adminUrls}
      userName={userName}
      signout={signout}
    />);
    expect(wrapper.find(NavLink).length).toEqual(3);
  });
  it('should render 2 "NavLink"', () => {
    const userName = 'Dika';
    const wrapper = shallow(<Navigation
      urls={customerUrls}
      userName={userName}
      signout={signout}
    />);
    expect(wrapper.find(NavLink).length).toEqual(2);
  });
  it('should <Navigation /> correctly', () => {
    const userName = 'Dika';
    const tree = shallow(<Navigation
      urls={urls}
      userName={userName}
      signout={signout}
    />);
    expect(tree).toMatchSnapshot();
  });
});
