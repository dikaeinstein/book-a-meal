import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedMenuCard, { MenuCard }
  from '../../../components/UserMenu/MenuCard';
import initialState from '../../../reducers/initialState';


describe('<MenuCard />', () => {
  let wrapper;
  beforeAll(() => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    wrapper = shallow(<ConnectedMenuCard
      link="/test"
      store={store}
      fetchMenu={jest.fn()}
      currentUrl="http://testurl"
    />);
  });
  it('should render with correct props', () => {
    expect(wrapper.props().link).toEqual('/test');
    expect(wrapper.props().isFetching).toBeFalsy();
    expect(wrapper.props().fetchMenu).toBeDefined();
  });
  it('should match snapshot', () => {
    let tree = shallow(<MenuCard
      link="/test"
      fetchMenu={jest.fn()}
      isFetching
      currentUrl="http://testurl"
    />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<MenuCard
      link="/test"
      fetchMenu={jest.fn()}
      isFetching={false}
      currentUrl="http://testurl"
    />);
    expect(tree).toMatchSnapshot();
  });
});
