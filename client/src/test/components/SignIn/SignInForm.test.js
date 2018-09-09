import React from 'react';
import { shallow } from 'enzyme';
import SignInForm from '../../../components/SignIn/SignInForm';

describe('<SignInForm />', () => {
  const props = {
    errors: {
      signIn: '',
      email: '',
      password: '',
    },
    touched: {
      email: false,
      password: false,
    },
    isSubmitting: false,
  };
  it('should show loading indicator when isSubmitting', () => {
    const tree = shallow(<SignInForm {...{ ...props, isSubmitting: true }} />);
    expect(tree).toMatchSnapshot();
  });
  it('should show an error if password does not validate', () => {
    const tree = shallow(<SignInForm {...{
      ...props,
      error: { password: 'error' },
      touched: { password: true },
    }}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should show an error if email does not validate', () => {
    const tree = shallow(<SignInForm {...{
      ...props,
      error: { email: 'error' },
      touched: { email: true },
    }}
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot', () => {
    const tree = shallow(<SignInForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
