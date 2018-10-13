import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedMeals, { Meals } from '../../../components/Meals';
import Button from '../../../components/util/Button';
import initialState from '../../../reducers/initialState';

describe('<Meals />', () => {
  const meal = {
    name: 'Test meal',
    description: 'This is a test meal',
    user: { name: 'Test Dika' },
    imageUrl: 'http://testimageurl',
    price: 4000,
  };
  const props = {
    error: null,
    fetchMeals: jest.fn(),
    fetchCatererMeals: jest.fn(),
    userRole: 'superAdmin',
    currentUrl: 'http://testurl',
    catererCurrentUrl: 'http://testurl',
    meal,
  };
  it('should call handleAddMeal when addMeal is clicked', () => {
    const handleAddMealSpy = jest.spyOn(Meals.prototype, 'handleAddMeal');
    let wrapper = shallow(<Meals {...props} />);
    let addMeal = wrapper.find(Button).first();
    addMeal.simulate('click');
    expect(handleAddMealSpy).toHaveBeenCalled();

    wrapper = shallow(<Meals {...{ ...props, userRole: 'caterer' }} />);
    addMeal = wrapper.find(Button).first();
    addMeal.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with correct props from redux', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedMeals {...props} store={store} />);
    expect(wrapper.props().userRole).toEqual('');
    expect(wrapper.props().error).toBeNull();
  });
  it('should match snapshot', () => {
    let tree = shallow(<Meals {...props} />);
    expect(tree).toMatchSnapshot();

    tree = shallow(<Meals {...{ ...props, userRole: 'caterer' }} />);
    expect(tree).toMatchSnapshot();

    tree.setState({ updating: true });
    expect(tree).toMatchSnapshot();
  });
});
