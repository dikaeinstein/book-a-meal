import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedUserMenu, { UserMenu } from '../../../components/UserMenu';


describe('<UserMenu />', () => {
  it('should render "UserMenu" with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ menu: { fetchError: null } });
    const wrapper = shallow(<ConnectedUserMenu store={store} />);
    expect(wrapper.props().fetchMenuError).toBeNull();
  });
  it('should match snapshot', () => {
    const tree = shallow(<UserMenu />);
    expect(tree).toMatchSnapshot();
  });
});
