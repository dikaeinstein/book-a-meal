import React from 'react';
import { shallow } from 'enzyme';
import MealDetail from '../../../components/Meals/MealDetail';

describe('<MealDetail />', () => {
  const props = {
    closeMealDetail: jest.fn(),
    meal: {
      name: 'Test meal',
      description: 'This is a test meal',
      user: { name: 'Test Dika' },
    },
  };
  it('should call handleCloseMealDetail when backToMeals is clicked', () => {
    const wrapper = shallow(<MealDetail {...props} />);
    const closeMealDetail = wrapper.find('div[role="button"]');
    closeMealDetail.simulate('click');
    expect(props.closeMealDetail).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<MealDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
