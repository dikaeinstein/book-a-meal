import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedMealList, { MealList } from '../../../components/UserMenu/MealList';

describe('<MealList />', () => {
  const meals = [
    { id: 1, name: 'test meal1' },
    { id: 2, name: 'test meal2' },
    { id: 3, name: 'test meal3' },
  ];
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({
      menu: {
        byId: {
          1: { name: 'test menu', meals },
        },
        menuId: 1,
      },
    });

    const wrapper = shallow(<ConnectedMealList store={store} link="/test" />);
    expect(wrapper.props().meals).toEqual(meals);
    expect(wrapper.props().link).toEqual('/test');
  });
  it('should match snapshot', () => {
    const tree = shallow(<MealList meals={meals} link="/" />);
    expect(tree).toMatchSnapshot();
  });
});
