import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SideImage from '../../components/SideImage';
import setup from '../setup';

// Setup tests
setup();

let wrapper;

describe('<SideImage />', () => {
  beforeAll(() => {
    wrapper = shallow(<SideImage id="testIn" />);
  });
  it('should render a SideImage component', () => {
    expect(wrapper.find('section').length).toEqual(1);
  });
  it('should render SideImage with correct props', () => {
    expect(wrapper.find('section').props().id).toEqual('testIn');
  });
  it('should match snapshot', () => {
    const tree = shallow(<SideImage id="testIn" />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
