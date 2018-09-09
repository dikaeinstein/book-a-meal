import React from 'react';
import { shallow } from 'enzyme';
import MenuMeals from '../../../components/Menus/MenuMeals';


describe('<MenuMeals />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal', price: 4000 },
  ];

  it('should match snapshot', () => {
    const tree = shallow(<MenuMeals meals={meals} />);
    expect(tree).toMatchSnapshot();
  });
});
