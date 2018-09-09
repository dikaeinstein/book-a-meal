import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import { SignUp } from '../../../components/SignUp';


describe('<SignUp />', () => {
  const props = { signUp: jest.fn() };
  let tree;
  beforeAll(() => {
    tree = shallow(<SignUp {...props} />);
  });
  it('should call handleSubmit when form is submitted', () => {
    tree.find(Formik).simulate('submit');
    expect(props.signUp).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
