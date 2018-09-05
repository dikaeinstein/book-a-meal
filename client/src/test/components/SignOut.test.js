import React from 'react';
import { shallow } from 'enzyme';
import { SignOut } from '../../components/SignOut';

describe('<SignOut />', () => {
  it('should match snapshot', () => {
    const tree = shallow(<SignOut><div>test</div></SignOut>);
    expect(tree).toMatchSnapshot();
  });
});
