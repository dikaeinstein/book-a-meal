import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard } from '../../../components/Dashboard';

describe('<Dashboard />', () => {
  it('renders with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ dashboard: { fetchAllOrdersError: null } });
    const wrapper = shallow(<ConnectedDashboard store={store} />);
    expect(wrapper.props().fetchAllOrdersError).toBeNull();
  });
  it('should match snapshot', () => {
    const tree = shallow(<Dashboard />);
    expect(tree).toMatchSnapshot();
  });
});
