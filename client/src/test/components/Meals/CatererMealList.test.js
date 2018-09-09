import React from 'react';
import { shallow } from 'enzyme';
import CatererMealList
  from '../../../components/Meals/CatererMealLIst';

describe('<CatererMealList />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal2', price: 4000 },
  ];
  const props = { meals, handleMealUpdate: jest.fn() };
  it('should match snapshot', () => {
    const tree = shallow(<CatererMealList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
