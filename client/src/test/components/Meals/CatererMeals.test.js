import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedCatererMeals, { CatererMeals }
  from '../../../components/Meals/CatererMeals';

describe('<CatererMeals />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal2', price: 4000 },
  ];
  const props = {
    isFetching: false,
    handleMealUpdate: jest.fn(),
    meals,
  };
  it('should render with correct props from redux', () => {
    const mockStore = configureStore();
    const store = mockStore({
      meals: {
        isFetching: false,
        byId: { 1: meals[0], 2: meals[1] },
        allIds: [1, 2],
      },
    });
    const wrapper = shallow(<ConnectedCatererMeals
      store={store}
      handleMealUpdate={jest.fn()}
    />);
    expect(wrapper.props().isFetching).toBeFalsy();
    expect(wrapper.props().meals.length).toEqual(2);
  });
  it('should match snapshot', () => {
    let tree = shallow(<CatererMeals {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<CatererMeals {...{ ...props, isFetching: true }} />);
    expect(tree).toMatchSnapshot();
  });
});
