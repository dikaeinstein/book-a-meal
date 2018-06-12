import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from '../../components/Footer';
import setup from '../setup';

// Setup tests
setup();

let wrapper;

describe('<Footer />', () => {
  beforeAll(() => {
    wrapper = shallow(<Footer />);
  });
  // renders footer element
  it('should render footer element', () => {
    expect(wrapper.find('footer').length).toEqual(1);
  });
  it('should render a p element', () => {
    expect(wrapper.find('p').length).toEqual(1);
  });
  it('should render an a tag element with correct href', () => {
    expect(wrapper.find('a').props().href)
      .toEqual('https://dikaeinstein.github.io');
  });
  it('should match snapshot', () => {
    const tree = shallow(<Footer />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
