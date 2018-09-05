import React from 'react';
import { shallow } from 'enzyme';
import errorHandler from '../../../components/util/errorHandler';

describe('errorHandler', () => {
  let ErrorWrapper =
    errorHandler(() => <div />, 'Test error message', true, jest.fn());
  it('should return ErrorWrapper', () => {
    expect(ErrorWrapper).toBeDefined();
  });
  it('should match snapshot', () => {
    let wrapper = shallow(<ErrorWrapper />);
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<ErrorWrapper error={new Error()} />);
    expect(wrapper).toMatchSnapshot();
    ErrorWrapper =
    errorHandler(() => <div />, 'Test error message');
    wrapper = shallow(<ErrorWrapper error={new Error()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
