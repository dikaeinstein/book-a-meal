import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/util/Footer';

describe('<Footer />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});
