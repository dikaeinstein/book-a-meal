import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedSetupMenu, { SetupMenu }
  from '../../../components/Menus/SetupMenu';
import MenuCheckBoxForm from '../../../components/Menus/MenuCheckBoxForm';
import initialState from '../../../reducers/initialState';


describe('<SetupMenu />', () => {
  const props = {
    setMenu: jest.fn(),
    error: null,
    meals: [],
    fetchMeals: jest.fn(),
    isSaving: false,
    closeModal: jest.fn(),
    currentUrl: 'http://testurl',
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedSetupMenu store={store} closeModal={jest.fn()} />);
    expect(wrapper.props().error).toBeNull();
    expect(wrapper.props().isSaving).toBeFalsy();
    expect(wrapper.props().meals.length).toEqual(0);
  });
  it('should call handleSubmit when menu is set', () => {
    const spy = jest.spyOn(SetupMenu.prototype, 'handleSubmit');
    const wrapper = shallow(<SetupMenu {...props} />);
    const setupMenuForm = wrapper.find(MenuCheckBoxForm);
    setupMenuForm.props().handleSubmit({
      name: 'Test menu', mealIds: [1, 2],
    });
    expect(spy).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<SetupMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
