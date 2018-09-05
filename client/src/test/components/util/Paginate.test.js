import React from 'react';
import { shallow } from 'enzyme';
import Paginate from '../../../components/util/Paginate';

describe('<Paginate />', () => {
  it('should match snapshot', () => {
    let tree = shallow(<Paginate onPageChange={jest.fn()} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Paginate
      onPageChange={jest.fn()}
      previousUrl="http://prevUrl"
    />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<Paginate
      onPageChange={jest.fn()}
      nextUrl="http://nextUrl"
    />);
    expect(tree).toMatchSnapshot();
  });
  it('should call handleNext when next is clicked', () => {
    const spy = jest.spyOn(Paginate.prototype, 'handleNext');
    const wrapper = shallow(<Paginate
      onPageChange={jest.fn()}
      nextUrl="http://nextUrl"
    />);
    wrapper.find('button').last()
      .simulate('click', { preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });
  it('should call handlePrevious when next is clicked', () => {
    const spy = jest.spyOn(Paginate.prototype, 'handlePrevious');
    const wrapper = shallow(<Paginate
      onPageChange={jest.fn()}
      previousUrl="http://prevUrl"
    />);
    wrapper.find('button').first()
      .simulate('click', { preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });
});
