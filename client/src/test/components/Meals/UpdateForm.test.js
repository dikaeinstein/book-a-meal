import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import cloudinaryImageUpload from '../../../helpers/cloudinaryImageUpload';
import ConnectedUpdateMealForm, { UpdateMealForm }
  from '../../../components/Meals/UpdateMealForm';

describe('<UpdateMealForm />', () => {
  const props = {
    errors: {
      updateMeal: null,
      name: null,
      price: null,
      description: null,
    },
    touched: { name: false, price: false, description: false },
    isUpdating: false,
    values: { imageUrl: '' },
  };
  it('should call handleImageChange when image changes', () => {
    const spy = jest.spyOn(UpdateMealForm.prototype, 'handleImageChange');
    const wrapper = shallow(<UpdateMealForm {...props} />);
    cloudinaryImageUpload.mockResolvedValue(Promise.resolve('http://imageurl'));
    let fileInput = wrapper.find('input[type="file"]');
    fileInput.simulate('change', {
      target: {
        files: [{ name: 'mockImage' }],
      },
    });
    expect(spy).toHaveBeenCalled();

    cloudinaryImageUpload.mockResolvedValue(Promise.reject(new Error()));
    fileInput = wrapper.find('input[type="file"]');
    fileInput.simulate('change', {
      target: {
        files: [{ name: 'mockImage' }],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with correct props from redux', () => {
    const mockStore = configureStore();
    const store = mockStore({ meals: { isUpdating: false } });
    const wrapper = shallow(<ConnectedUpdateMealForm {...props} store={store} />);
    expect(wrapper.props().isUpdating).toEqual(false);
  });
  it('should match snapshot', () => {
    let tree = shallow(<UpdateMealForm {...props} />);
    expect(tree).toMatchSnapshot();

    tree = shallow(<UpdateMealForm {...{ ...props, isUpdating: true }} />);
    expect(tree).toMatchSnapshot();

    tree = shallow(<UpdateMealForm {...{ ...props, errors: { updateMeal: 'true' } }} />);
    expect(tree).toMatchSnapshot();
  });
});
