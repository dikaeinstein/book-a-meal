import React from 'react';
import { shallow } from 'enzyme';
import Label from '../../../components/util/Label';

describe('<Label />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Label htmlFor="test">test</Label>);
    expect(tree).toMatchSnapshot();
  });
});
