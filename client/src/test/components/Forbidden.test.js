import React from 'react';
import { shallow } from 'enzyme';
import Forbidden from '../../components/Forbidden';


describe('<Forbidden />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Forbidden />);
    expect(tree).toMatchSnapshot();
  });
});
