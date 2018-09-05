import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedTotalOrders, { TotalOrders }
  from '../../../components/Dashboard/TotalOrders';


describe('<TotalOrders />', () => {
  it('should call fetAllOrders when component mounts', () => {
    const fetchTotalOrders = jest.fn();
    shallow(<TotalOrders
      totalOrders={4}
      userRole="superAdmin"
      fetchTotalOrders={fetchTotalOrders}
      fetchCatererTotalOrders={jest.fn()}
    />);
    expect(fetchTotalOrders).toHaveBeenCalled();
  });
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore({
      user: { data: { role: 'superAdmin' } },
      dashboard: { totalOrders: 4 },
    });
    const wrapper = shallow(<ConnectedTotalOrders store={store} />);
    expect(wrapper.props().userRole).toEqual('superAdmin');
    expect(wrapper.props().totalOrders).toEqual(4);
  });
  it('should match snapshot', () => {
    const tree = shallow(<TotalOrders
      totalOrders={4}
      userRole="caterer"
      fetchTotalOrders={jest.fn()}
      fetchCatererTotalOrders={jest.fn()}
    />);
    expect(tree).toMatchSnapshot();
  });
});
