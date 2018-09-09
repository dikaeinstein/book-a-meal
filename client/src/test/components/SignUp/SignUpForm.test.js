import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../components/SignUp/SignUpForm';

describe('<SignUpForm />', () => {
  const props = {
    errors: {
      SignUp: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      name: '',
    },
    touched: {
      email: false,
      password: false,
      name: false,
      confirmPassword: false,
      role: false,
    },
    isSubmitting: false,
  };
  it('should show loading indicator when isSubmitting', () => {
    const tree = shallow(<SignUpForm {...{ ...props, isSubmitting: true }} />);
    expect(tree).toMatchSnapshot();
  });
  it('should show an error if password does not validate', () => {
    const tree = shallow(<SignUpForm {...{
      ...props,
      error: { password: 'error' },
      touched: { password: true },
    }}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should show an error if email does not validate', () => {
    const tree = shallow(<SignUpForm {...{
      ...props,
      error: { email: 'error' },
      touched: { email: true },
    }}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot', () => {
    const tree = shallow(<SignUpForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

