import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedUserOrderHistory, { UserOrderHistory }
  from '../../../components/UserOrderHistory';
import initialState from '../../../reducers/initialState';


describe('<UserOrderHistory />', () => {
  it('should call handleRetry on when fetch orders fail', () => {
    const spy = jest.spyOn(UserOrderHistory.prototype, 'handleRetry');
    const wrapper = shallow(<UserOrderHistory
      fetchUserOrders={jest.fn()}
      isFetching={false}
      error={new Error()}
      currentUrl="http://testurl"
    />);
    wrapper.instance().handleRetry();
    expect(spy).toHaveBeenCalled();
  });
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedUserOrderHistory
      store={store}
      fetchUserOrders={jest.fn()}
    />);
    expect(wrapper.props().isFetching).toBeFalsy();
    expect(wrapper.props().error).toBeNull();
  });
  it('should match snapshot', () => {
    const tree = shallow(<UserOrderHistory
      fetchUserOrders={jest.fn()}
      isFetching
      currentUrl="http://testurl"
    />);
    expect(tree).toMatchSnapshot();
  });
});
