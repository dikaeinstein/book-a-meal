import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import sweetalert from 'sweetalert';
import ConnectedMenus, { Menus } from '../../../components/Menus';
import Button from '../../../components/util/Button';

jest.mock('sweetalert');

describe('<Menus />', () => {
  const props = {
    userRole: 'superAdmin',
    isSet: false,
    fetchMenuError: null,
  };
  it('should call handleCloseModal when modal is closed', () => {
    const closeModalSpy = jest.spyOn(Menus.prototype, 'handleCloseModal');
    const wrapper = shallow(<Menus {...props} />);
    const closeModal = wrapper.find(Button).last();
    closeModal.simulate('click');
    expect(closeModalSpy).toHaveBeenCalled();
    expect(wrapper.state().isOpen).toBeFalsy();
  });
  it('should call handleOpenModal when set menu is clicked', () => {
    const openModalSpy = jest.spyOn(Menus.prototype, 'handleOpenModal');
    sweetalert.mockResolvedValue(Promise.resolve());
    let wrapper = shallow(<Menus {...props} />);
    let setMenu = wrapper.find(Button).first();
    setMenu.simulate('click');
    expect(openModalSpy).toHaveBeenCalled();
    expect(wrapper.state().isOpen).toBeTruthy();
    wrapper = shallow(<Menus {...{ ...props, userRole: 'caterer' }} />);
    setMenu = wrapper.find(Button).first();
    setMenu.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleMenuUpdate when updateMenu is clicked', () => {
    const openModalSpy = jest.spyOn(Menus.prototype, 'handleMenuUpdate');
    sweetalert.mockResolvedValue(Promise.resolve());
    let wrapper = shallow(<Menus {...props} />);
    let updateMenu = wrapper.find(Button).at(1);
    updateMenu.simulate('click');
    expect(openModalSpy).toHaveBeenCalled();
    sweetalert.mockResolvedValue(Promise.resolve());
    wrapper = shallow(<Menus {...{ ...props, userRole: 'caterer' }} />);
    updateMenu = wrapper.find(Button).at(1);
    updateMenu.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with correct props from redux', () => {
    const mockStore = configureStore();
    const store = mockStore({
      menu: { isSet: false, fetchError: null },
      user: { data: { role: 'caterer' } },
    });
    const wrapper = shallow(<ConnectedMenus store={store} />);
    expect(wrapper.props().isSet).toBeFalsy();
    expect(wrapper.props().fetchMenuError).toBeNull();
    expect(wrapper.props().userRole).toEqual('caterer');
  });
  it('should match snapshot', () => {
    const tree = shallow(<Menus {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
