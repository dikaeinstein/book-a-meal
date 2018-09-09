import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedUpdateMenu, { UpdateMenu }
  from '../../../components/Menus/UpdateMenu';
import MenuCheckBoxForm from '../../../components/Menus/MenuCheckBoxForm';
import initialState from '../../../reducers/initialState';

describe('<UpdateMenu />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal', price: 4000 },
  ];
  const props = {
    setMenu: jest.fn(),
    error: null,
    menu: { name: 'Test menu for today', meals },
    fetchMeals: jest.fn(),
    isUpdating: false,
    isFetching: false,
    menuId: 1,
    meals,
    modifyMenu: jest.fn(),
    closeModal: jest.fn(),
    currentUrl: 'http://testurl',
  };
  it('should render with correct props', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ConnectedUpdateMenu {...props} store={store} />);
    expect(wrapper.props().error).toBeNull();
    expect(wrapper.props().isUpdating).toBeFalsy();
    expect(wrapper.props().meals.length).toEqual(0);
  });
  it('should call handleSubmit when menu is set', () => {
    const spy = jest.spyOn(UpdateMenu.prototype, 'handleSubmit');
    const wrapper = shallow(<UpdateMenu {...props} />);
    const updateMenuForm = wrapper.find(MenuCheckBoxForm);
    updateMenuForm.props().handleSubmit({ mealIds: [1, 2] });
    expect(spy).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    const tree = shallow(<UpdateMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
