import React from 'react';
import { Formik } from 'formik';
import { shallow } from 'enzyme';
import { UpdateMeal } from '../../../components/Meals/UpdateMeal';

describe('<UpdateMeal />', () => {
  const meal = {
    name: 'Test meal',
    description: 'This is a test meal',
    imageUrl: 'http://testimageurl',
    price: 4000,
  };
  const props = {
    editMeal: jest.fn(),
    closeModal: jest.fn(),
    meal,
  };
  it('should call handleSubmit when form is submitted', () => {
    const wrapper = shallow(<UpdateMeal {...props} />);
    const form = wrapper.find(Formik);
    form.simulate('submit');
    expect(props.editMeal).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<UpdateMeal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
