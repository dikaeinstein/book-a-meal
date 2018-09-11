import React from 'react';
import { shallow } from 'enzyme';
import Error from '../../../components/util/Error';


describe('<Error />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Error />);
    expect(tree).toMatchSnapshot();
  });
});
