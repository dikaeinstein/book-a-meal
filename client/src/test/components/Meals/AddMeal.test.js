import React from 'react';
import { Formik } from 'formik';
import { shallow } from 'enzyme';
import { AddMeal } from '../../../components/Meals/AddMeal';

describe('<AddMeal />', () => {
  const props = {
    saveMeal: jest.fn(),
    closeModal: jest.fn(),
  };
  it('should call handleSubmit when form is submitted', () => {
    const wrapper = shallow(<AddMeal {...props} />);
    const form = wrapper.find(Formik);
    form.simulate('submit');
    expect(props.saveMeal).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<AddMeal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
