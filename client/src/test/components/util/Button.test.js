import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../components/util/Button';

describe('<Button />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Button value="Test" className="test" />);
    expect(tree).toMatchSnapshot();
  });
});
