import React from 'react';
import { shallow } from 'enzyme';
import SigninSignupButton
  from '../../../components/UserMenu/SigninSignupButtons';
import Button from '../../../components/util/Button';

describe('<SigninSignupButton />', () => {
  let wrapper;
  const closeModal = jest.fn();
  beforeAll(() => {
    wrapper = shallow(<SigninSignupButton closeModal={closeModal} />);
  });
  it('should call handleSignin or handleSignup', () => {
    wrapper.find(Button).first().simulate('click');
    wrapper.find(Button).last().simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
