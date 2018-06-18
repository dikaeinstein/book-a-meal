import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserMenu from '../../components/UserMenu';
import MenuCard from '../../components/MenuCard';
import setup from '../setup';

// Setup tests
setup();

let wrapper;

describe('<UserMenu />', () => {
  beforeAll(() => {
    wrapper = shallow(<UserMenu />);
  });
  it('should render a MenuCard component', () => {
    expect(wrapper.find(MenuCard).length).toEqual(1);
  });
  it('should match snapshot', () => {
    const tree = shallow(<UserMenu />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
