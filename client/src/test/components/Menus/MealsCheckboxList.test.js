import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedMealsCheckboxList, { MealsCheckboxList }
  from '../../../components/Menus/MealsCheckboxList';

describe('<MealsCheckboxList />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal2', price: 4000 },
  ];
  const props = {
    meals,
    isFetching: false,
    handleCheck: jest.fn(),
    checkedMeals: {},
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ meals: { isFetching: false } });
    const wrapper = shallow(<ConnectedMealsCheckboxList
      store={store}
      handleCheck={jest.fn()}
      meals={meals}
      checkedMeals={{}}
    />);
    expect(wrapper.props().isFetching).toBeFalsy();
  });
  it('should call handleCheck when meal is checked', () => {
    const handleCheck = jest.fn();
    const wrapper = shallow(<MealsCheckboxList {...{ ...props, handleCheck }} />);
    const checkBox = wrapper.find('input').first();
    checkBox.simulate('change');
    expect(handleCheck).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    let tree = shallow(<MealsCheckboxList {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<MealsCheckboxList {...{ ...props, isFetching: true }} />);
    expect(tree).toMatchSnapshot();
  });
});
