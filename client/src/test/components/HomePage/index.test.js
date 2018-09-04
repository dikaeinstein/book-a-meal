import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedHomePage, { HomePage } from '../../../components/HomePage';

describe('HomePage', () => {
  let store;
  let wrapper;
  beforeEach(() => {
    const initialState = {
      menu: {
        fetchError: null,
      },
    };
    const mockStore = configureStore();
    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(<ConnectedHomePage store={store} />);
  });
  it('should receive error prop', () => {
    expect(wrapper.props().error).toBeNull();
  });
  it('should render HomePage correctly', () => {
    const tree = shallow(<HomePage />);
    expect(tree).toMatchSnapshot();
  });
});
