import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import IntroBanner from '../../components/IntroBanner';
import setup from '../setup';

// Setup tests
setup();

let wrapper;

describe('IntroBanner', () => {
  beforeAll(() => {
    wrapper = shallow(<IntroBanner />);
  });
  it('should render intro banner', () => {
    expect(wrapper.find('.intro-banner').length).toEqual(1);
  });
  it('should render a h1 element', () => {
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h1').text()).toEqual('Book-A-Meal');
  });
  it('should render a p element', () => {
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text())
      .toEqual('Your favourite meal order service');
  });
  it('should render a <Button />', () => {
    expect(wrapper.find('[value="Book A Meal Now"]').length)
      .toEqual(1);
  });
  it('should render an a tag with correct href', () => {
    const a = wrapper.find('a');
    expect(a.length).toEqual(1);
    expect(a.props().href).toEqual('#menu');
  });
  it('should match snapshot', () => {
    const tree = shallow(<IntroBanner />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
