import React from 'react';
import { shallow } from 'enzyme';
import IntroBanner from '../../../components/HomePage/IntroBanner';

describe('IntroBanner', () => {
  it('should render IntroBanner correctly', () => {
    const tree = shallow(<IntroBanner />);
    expect(tree).toMatchSnapshot();
  });
});
