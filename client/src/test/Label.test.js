import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Label from '../components/Label';
import setup from './setup';

// Setup tests
setup();

let wrapper;

describe('<Label />', () => {
  beforeAll(() => {
    wrapper = shallow(<Label htmlFor="test">test</Label>);
  });
  it('should render a label element', () => {
    expect(wrapper.find('label').length).toEqual(1);
  });
  it('should render with correct props', () => {
    expect(wrapper.find('label').props().htmlFor).toEqual('test');
  });
  it('should match snapshot', () => {
    const tree = shallow(<Label htmlFor="test">test</Label>);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
