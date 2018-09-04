import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import NotFound from '../../components/NotFound';
import Button from '../../components/util/Button';

describe('<NotFound />', () => {
  it('should render a "Button" to navigate back', () => {
    const history = createMemoryHistory({
      initialEntries: ['/', '/404'], // The initial URLs in the history stack
    });
    const tree = shallow(<NotFound history={history} />);
    const goBack = tree.find(Button);
    goBack.simulate('click');
    expect(history.location.pathname).toEqual('/');
  });
  it('should render correctly', () => {
    const tree = shallow(<NotFound />);
    expect(tree).toMatchSnapshot();
  });
});
