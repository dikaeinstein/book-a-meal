import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../../../components/util/ErrorBoundary';


describe('<ErrorBoundary />', () => {
  it('should catch errors in children components tree', () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    const wrapper = shallow(<ErrorBoundary><div /></ErrorBoundary>);
    wrapper.instance().componentDidCatch();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().hasError).toEqual(true);
  });
  it('should match snapshot', () => {
    const tree = shallow(<ErrorBoundary><div /></ErrorBoundary>);
    expect(tree).toMatchSnapshot();
  });
});
