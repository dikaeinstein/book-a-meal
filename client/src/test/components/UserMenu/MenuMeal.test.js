import React from 'react';
import { shallow } from 'enzyme';
import { MenuMeal } from '../../../components/UserMenu/MenuMeal';

describe('<MenuMeal />', () => {
  let meal;
  let wrapper;
  beforeAll(() => {
    meal = {
      id: 1,
      name: 'test meal',
      price: 2000,
      user: { name: 'Dika Test' },
      imageUrl: 'http://testurl.com/image.jpg',
    };

    wrapper = shallow(<MenuMeal defaultMeal={meal} />);
  });
  it('should call handleOpenMealDetail', () => {
    const spyOn = jest.spyOn(MenuMeal.prototype, 'handleOpenMealDetailModal');
    wrapper = shallow(<MenuMeal defaultMeal={meal} />);
    const overlayContainer = wrapper.find('.overlay-container');
    overlayContainer.simulate('click');
    expect(spyOn).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<MenuMeal defaultMeal={meal} />);
    expect(tree).toMatchSnapshot();
  });
});
