import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../../components/Button';
import setup from '../setup';

// Setup tests
setup();

let wrapper;

describe('<Button />', () => {
  beforeAll(() => {
    wrapper = shallow(<Button value="Test" className="test" />);
  });
  it('should render a button element', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should render a button with correct props', () => {
    expect(wrapper.find('button').props().className)
      .toEqual('test');
  });
  it('should render a button with correct value', () => {
    expect(wrapper.find('button').text()).toEqual('Test');
  });
  it('should match snapshot', () => {
    const tree = shallow(<Button value="Test" className="test" />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
