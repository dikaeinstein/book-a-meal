import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedFilterOrders, { FilterOrders }
  from '../../../components/Dashboard/FilterOrders';
import Button from '../../../components/util/Button';

describe('<FilterOrders />', () => {
  const props = {
    userRole: 'superAdmin',
    fetchAllOrders: jest.fn(),
    fetchCatererOrders: jest.fn(),
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({ user: { data: { role: 'superAdmin' } } });
    const wrapper = shallow(<ConnectedFilterOrders store={store} />);
    expect(wrapper.props().userRole).toEqual('superAdmin');
  });
  it('should call handleChange when date is changed', () => {
    const spy = jest.spyOn(FilterOrders.prototype, 'handleChange');
    const wrapper = shallow(<FilterOrders {...props} />);
    const datePicker = wrapper.find('.filter-input');
    datePicker.simulate('change', {
      preventDefault: jest.fn(),
      target: { value: '2018-09-05' },
    });
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().date).toEqual('2018-09-05');
  });
  it('should call handleFilter when orders is to be filtered', () => {
    const spy = jest.spyOn(FilterOrders.prototype, 'handleFilter');
    let wrapper = shallow(<FilterOrders {...{ ...props, userRole: 'caterer' }} />);
    let filter = wrapper.find(Button);
    filter.simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().date).toEqual('');
    wrapper = shallow(<FilterOrders {...props} />);
    filter = wrapper.find(Button);
    filter.simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().date).toEqual('');
  });
  it('should match snapshot', () => {
    const tree = shallow(<FilterOrders {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
