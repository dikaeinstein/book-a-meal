import React from 'react';
import { shallow } from 'enzyme';
import MenuCheckBoxForm
  from '../../../components/Menus/MenuCheckBoxForm';

describe('<MenuCheckBoxForm />', () => {
  const meals = [
    { id: 1, name: 'test meal', price: 4000 },
    { id: 2, name: 'test meal', price: 4000 },
  ];
  const props = {
    meals,
    defaultMenuName: 'Menu for Today',
    defaultMenuMealIds: [1, 2],
    handleSubmit: jest.fn(),
    isSubmitting: false,
    error: null,
    action: 'set',
    nextUrl: 'http://testurl/next',
    previousUrl: 'http://testurl.com',
    onPageChange: jest.fn(),
  };
  it('should call handleChange when meal name changes', () => {
    const spy = jest.spyOn(MenuCheckBoxForm.prototype, 'handleChange');
    const wrapper = shallow(<MenuCheckBoxForm {...props} />);
    wrapper.find('input').simulate('change', {
      target: { value: 'Menu for Today' },
    });
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().name).toEqual('Menu for Today');
  });
  it('should call handleCheck when meal is checked', () => {
    const spy = jest.spyOn(MenuCheckBoxForm.prototype, 'handleCheck');
    const wrapper = shallow(<MenuCheckBoxForm {...props} />);
    wrapper.instance().handleCheck({
      target: {
        checked: true,
        name: 'meal-1',
      },
    });
    expect(spy).toHaveBeenCalled();
    wrapper.instance().handleCheck({
      target: {
        checked: false,
        name: 'meal-1',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleSubmit when meal submit button is clicked', () => {
    const submitSpy = jest.spyOn(MenuCheckBoxForm.prototype, 'handleSubmit');
    const handleSubmit = jest.fn();
    const wrapper = shallow(<MenuCheckBoxForm {...{ ...props, handleSubmit }} />);
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
    });
    expect(submitSpy).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    let tree = shallow(<MenuCheckBoxForm {...props} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<MenuCheckBoxForm {...{ ...props, isSubmitting: true }} />);
    expect(tree).toMatchSnapshot();
    tree = shallow(<MenuCheckBoxForm {...{
      ...props,
      error: 'Error submitting form',
      }}
    />);
    expect(tree).toMatchSnapshot();
  });
});
