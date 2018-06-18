import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NavLink, MemoryRouter } from 'react-router-dom';
import Logo from '../../components/Header/Logo';
import configureStore from '../../store/configureStore';
import initialState from '../../reducers/initialState';
import setup from '../setup';

// Setup tests
setup();

let wrapper;

const store = configureStore(initialState);

describe('<Logo />', () => {
  beforeAll(() => {
    /* eslint function-paren-newline: 0 */
    wrapper = mount(
      <MemoryRouter>
        <Logo
          text="Book-A-Meal"
          className="col-1-4 logo text-left"
          store={store}
        />
      </MemoryRouter>,
    );
  });
  it('should render a NavLink', () => {
    expect(wrapper.find(NavLink).length).toEqual(1);
  });
  it('should render a h1 element with correct text', () => {
    expect(wrapper.find('h1').text()).toEqual('Book-A-Meal');
  });
  it('should match snapshot', () => {
    const tree = mount(
      <MemoryRouter>
        <Logo
          text="Book-A-Meal"
          className="col-1-4 logo text-left"
          store={store}
        />
      </MemoryRouter>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
