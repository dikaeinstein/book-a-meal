import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../../components/util/Loading';

describe('<Loading />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<Loading text="test"><div>test loader</div></Loading>);
    expect(tree).toMatchSnapshot();
  });
});
