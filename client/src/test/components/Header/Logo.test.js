import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../../components/Header/Logo';


describe('<Logo />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Logo text="test" className="test-class" />);
    expect(tree).toMatchSnapshot();
  });
});
