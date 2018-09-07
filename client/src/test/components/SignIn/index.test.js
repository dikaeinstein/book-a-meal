import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import { SignIn } from '../../../components/SignIn';


describe('<SignIn />', () => {
  const props = { signIn: jest.fn() };
  let tree;
  beforeAll(() => {
    tree = shallow(<SignIn {...props} />);
  });
  it('should call handleSubmit when form is submitted', () => {
    tree.find(Formik).simulate('submit');
    expect(props.signIn).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
