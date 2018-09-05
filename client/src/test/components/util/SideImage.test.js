import React from 'react';
import { shallow } from 'enzyme';
import SideImage from '../../../components/util/SideImage';

describe('<SideImage />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<SideImage id="testIn" />);
    expect(tree).toMatchSnapshot();
  });
});
