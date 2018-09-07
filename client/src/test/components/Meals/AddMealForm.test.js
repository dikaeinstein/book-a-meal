import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import cloudinaryImageUpload from '../../../helpers/cloudinaryImageUpload';
import ConnectedAddMealForm, { AddMealForm }
  from '../../../components/Meals/AddMealForm';


/* eslint global-require: 0 */

describe('<AddMealForm />', () => {
  const props = {
    errors: {
      addMeal: null,
      name: null,
      price: null,
      description: null,
    },
    touched: { name: false, price: false, description: false },
    isSaving: false,
    values: { imageUrl: '' },
  };
  it('should call handleImageChange when image changes', () => {
    const spy = jest.spyOn(AddMealForm.prototype, 'handleImageChange');
    const wrapper = shallow(<AddMealForm {...props} />);
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
    const store = mockStore({ meals: { isSaving: false } });
    const wrapper = shallow(<ConnectedAddMealForm {...props} store={store} />);
    expect(wrapper.props().isSaving).toEqual(false);
  });
  it('should match snapshot', () => {
    let tree = shallow(<AddMealForm {...props} />);
    expect(tree).toMatchSnapshot();

    tree = shallow(<AddMealForm {...{ ...props, isSaving: true }} />);
    expect(tree).toMatchSnapshot();

    tree = shallow(<AddMealForm {...{ ...props, errors: { addMeal: 'true' } }} />);
    expect(tree).toMatchSnapshot();
  });
});
