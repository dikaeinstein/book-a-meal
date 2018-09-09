import React from 'react';
import { shallow } from 'enzyme';
import sweetalert from 'sweetalert';
import configureStore from 'redux-mock-store';
import ConnectedMeal, { Meal } from '../../../components/Meals/Meal';
import Button from '../../../components/util/Button';

jest.mock('sweetalert');

describe('<Meal />', () => {
  const meal = {
    name: 'Test meal',
    description: 'This is a test meal',
    user: { name: 'Test Dika' },
    imageUrl: 'http://testimageurl',
    price: 4000,
  };
  const props = {
    meal,
    isDeleting: false,
    isUpdating: false,
    handleMealUpdate: jest.fn(),
    removeMeal: jest.fn(),
    removeCatererMeal: jest.fn(),
    userRole: 'superAdmin',
  };
  it('should call handleOpenModal when viewMealDetail is clicked', () => {
    const openModalSpy = jest.spyOn(Meal.prototype, 'handleOpenModal');
    const wrapper = shallow(<Meal {...props} />);
    const viewMealDetail = wrapper.find('.overlay-container');
    viewMealDetail.simulate('click');
    expect(openModalSpy).toHaveBeenCalled();
    expect(wrapper.state().isOpen).toEqual(true);
  });
  it('should call handleCloseModal when viewMealDetail is clicked', () => {
    const closeModalSpy = jest.spyOn(Meal.prototype, 'handleCloseModal');
    const wrapper = shallow(<Meal {...props} />);
    const closeMealDetail = wrapper.find(Button);
    closeMealDetail.simulate('click');
    expect(closeModalSpy).toHaveBeenCalled();
    expect(wrapper.state().isOpen).toEqual(false);
  });
  it('should call handleDelete when "Delete" button is clicked', () => {
    const handleDeleteSpy = jest.spyOn(Meal.prototype, 'handleDelete');
    let wrapper = shallow(<Meal {...props} />);
    let deleteMeal = wrapper.find('button').last();

    sweetalert.mockResolvedValue(Promise.resolve(true));
    deleteMeal.simulate('click');
    expect(handleDeleteSpy).toHaveBeenCalled();

    sweetalert.mockResolvedValue(Promise.reject(new Error()));
    deleteMeal.simulate('click');
    expect(wrapper).toMatchSnapshot();

    sweetalert.mockResolvedValue(Promise.reject());
    deleteMeal.simulate('click');
    expect(wrapper).toMatchSnapshot();

    wrapper = shallow(<Meal {...{ ...props, userRole: 'caterer' }} />);
    deleteMeal = wrapper.find('button').last();
    sweetalert.mockResolvedValue(Promise.resolve(true));
    deleteMeal.simulate('click');
    expect(handleDeleteSpy).toHaveBeenCalled();
  });
  it('should call handlUpdate when "Edit" button is clicked', () => {
    const handleUpdateSpy = jest.spyOn(Meal.prototype, 'handleUpdate');

    let wrapper = shallow(<Meal {...props} />);
    let editMeal = wrapper.find('button').first();
    sweetalert.mockResolvedValue(Promise.resolve(true));
    editMeal.simulate('click');
    expect(handleUpdateSpy).toHaveBeenCalled();

    wrapper = shallow(<Meal {...{ ...props, userRole: 'caterer' }} />);
    editMeal = wrapper.find('button').first();

    sweetalert.mockResolvedValue(Promise.resolve(true));
    editMeal.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with correct props from redux', () => {
    const mockStore = configureStore();
    const store = mockStore({
      meals: { isUpdating: false, isDeleting: false },
      user: { data: { role: 'superAdmin' } },
    });
    const wrapper = shallow(<ConnectedMeal {...props} store={store} />);
    expect(wrapper.props().isUpdating).toEqual(false);
    expect(wrapper.props().isDeleting).toEqual(false);
  });
  it('should match snapshot', () => {
    const tree = shallow(<Meal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
