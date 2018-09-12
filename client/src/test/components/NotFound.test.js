import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

describe('<NotFound />', () => {
  it('should render correctly', () => {
    const tree = shallow(<NotFound />);
    expect(tree).toMatchSnapshot();
  });
});
