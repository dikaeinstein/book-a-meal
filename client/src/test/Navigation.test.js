import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter, NavLink } from 'react-router-dom';
import Navigation from '../components/Navigation';
import configureStore from '../store/configureStore';
import initialState from '../reducers/initialState';
import setup from './setup';

// Setup tests
setup();

const store = configureStore(initialState);

let wrapper;
const urls = [
  {
    id: 1,
    name: 'Sign in',
    link: 'signin',
  },
  {
    id: 2,
    name: 'Sign up',
    link: 'signup',
  },
];

describe('<Navigation />', () => {
  beforeAll(() => {
    /* eslint function-paren-newline: 0 */
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation urls={urls} />
        </MemoryRouter>
      </Provider>);
  });
  it('should render a Navigation element', () => {
    expect(wrapper.find(Navigation).length).toEqual(1);
  });
  it('should render a ul element', () => {
    expect(wrapper.find('ul').length).toEqual(1);
  });
  it('should render correct number of li elements', () => {
    expect(wrapper.find('li').length).toEqual(urls.length);
  });
  it('should render NavLink with correct props', () => {
    expect(wrapper.find(NavLink).length).toEqual(2);
    expect(wrapper.find(NavLink).first().props().to).toEqual(`/${urls[0].link}`);
  });
  it('should match snapshot', () => {
    const tree = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Navigation urls={urls} />
        </MemoryRouter>
      </Provider>);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
