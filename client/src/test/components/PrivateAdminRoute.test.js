import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedPrivateAdminRoute, { PrivateAdminRoute }
  from '../../components/PrivateAdminRoute';
import Dashboard from '../../components/Dashboard';

describe('<PrivateAdminRoute />', () => {
  let wrapper;
  let mockStore;
  beforeAll(() => {
    mockStore = configureStore();
  });
  it('should render with correct props', () => {
    const store = mockStore({
      user: { loggedIn: false, data: { role: 'caterer' } },
    });
    wrapper = shallow(<ConnectedPrivateAdminRoute
      path="/dashboard"
      component={Dashboard}
      store={store}
      userRole="caterer"
    />);
    expect(wrapper.props().loggedIn).toBeFalsy();
    expect(wrapper.props().path).toEqual('/dashboard');
  });
  it('should render a Component when logged in', () => {
    wrapper = shallow(<PrivateAdminRoute
      path="/dashboard"
      loggedIn
      userRole="caterer"
      component={Dashboard}
    />);
    expect(wrapper.find(Route).props().render()).toBeDefined();
  });
  it('should redirect "SignIn" when not logged in', () => {
    wrapper = shallow(<PrivateAdminRoute
      path="/dashboard"
      loggedIn={false}
      userRole="caterer"
      component={Dashboard}
    />);
    expect(wrapper.find(Route).props().render()).toBeDefined();
  });
  it('should render correctly', () => {
    wrapper = shallow(<PrivateAdminRoute
      path="/dashboard"
      loggedIn={false}
      component={Dashboard}
      userRole="caterer"
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
