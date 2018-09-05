import React from 'react';
import { shallow } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import ConnectedNavigation from '../../../components/Header/Navigation';
import Header from '../../../components/Header';
import Logo from '../../../components/Header/Logo';

let wrapper;

describe('<Header />', () => {
  beforeAll(() => {
    /* eslint function-paren-newline: 0 */
    wrapper = shallow(<Header className="test" />);
  });
  it('should render a hamburger', () => {
    const spy = jest.spyOn(document, 'getElementsByClassName');
    spy.mockReturnValue([{ classList: { toggle: jest.fn() } }]);
    wrapper.find('.toggle-show').simulate('click');
    expect(wrapper.find('.toggle-show').length).toEqual(1);
  });
  it('should render a "ToastContainer" component', () => {
    expect(wrapper.find(ToastContainer).length).toEqual(1);
  });
  it('should render a "Logo" component', () => {
    expect(wrapper.find(Logo).length).toEqual(1);
  });
  it('should render a "Navigation" component', () => {
    expect(wrapper.find(ConnectedNavigation).length).toEqual(1);
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
