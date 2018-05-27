import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Logo from '../components/Logo';
import setup from './setup';

// Setup tests
setup();

let wrapper;

describe('<Logo />', () => {
  beforeAll(() => {
    wrapper = shallow(<Logo
      text="Book-A-Meal"
      className="col-1-4 logo text-left"
    />);
  });
  it('should render a logo', () => {
    expect(wrapper.find('.logo').length).toEqual(1);
  });
  it('should render a logo with correct text', () => {
    expect(wrapper.find('.logo').text()).toEqual('Book-A-Meal');
  });
  it('should match snapshot', () => {
    const tree = shallow(<Logo
      text="Book-A-Meal"
      className="col-1-4 logo text-left"
    />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
