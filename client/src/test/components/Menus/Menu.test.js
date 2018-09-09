import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedMenu, { Menu } from '../../../components/Menus/Menu';
import initialState from '../../../reducers/initialState';

describe('<Menu />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal', price: 4000 },
  ];
  const fetchMenu = jest.fn();
  const props = {
    menu: { name: 'Test menu for today', meals },
    fetchMenu,
    isFetching: true,
    currentUrl: 'http://testurl.com',
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedMenu store={store} meals={meals} />);
    expect(wrapper.props().isFetching).toBeFalsy();
    expect(wrapper.props().currentUrl).toBeDefined();
  });
  it('should match snapshot', () => {
    let tree = shallow(<Menu {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Menu {...{
      ...props,
      isFetching: false,
      menu: { name: 'Menu for Today', meals },
    }}
    />);
    expect(tree).toMatchSnapshot();
  });
});
