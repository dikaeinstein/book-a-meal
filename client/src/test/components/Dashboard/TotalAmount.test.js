import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedTotalAmount, { TotalAmount }
  from '../../../components/Dashboard/TotalAmount';


describe('<totalAmount />', () => {
  it('should call fetAllOrders when component mounts', () => {
    const fetchTotalAmount = jest.fn();
    shallow(<TotalAmount
      totalAmount={4}
      userRole="superAdmin"
      fetchTotalAmount={fetchTotalAmount}
      fetchCatererTotalAmount={jest.fn()}
    />);
    expect(fetchTotalAmount).toHaveBeenCalled();
  });
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({
      user: { data: { role: 'superAdmin' } },
      dashboard: { totalAmount: 4 },
    });
    const wrapper = shallow(<ConnectedTotalAmount store={store} />);
    expect(wrapper.props().userRole).toEqual('superAdmin');
    expect(wrapper.props().totalAmount).toEqual(4);
  });
  it('should match snapshot', () => {
    const tree = shallow(<TotalAmount
      totalAmount={4}
      userRole="caterer"
      fetchTotalAmount={jest.fn()}
      fetchCatererTotalAmount={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
  });
});
