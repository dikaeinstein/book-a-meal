import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
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

describe('<MockNavigation />', () => {
  beforeAll(() => {
    /* eslint function-paren-newline: 0 */
    wrapper = mount(
      <Provider store={store}>
        <Navigation urls={urls} />
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
  it('should render a tag elements with correct hrefs', () => {
    expect(wrapper.find('a').first().props().href)
      .toEqual(urls[0].link);
    expect(wrapper.find('a').last().props().href)
      .toEqual(urls[1].link);
  });
  it('should match snapshot', () => {
    const tree = mount(
      <Provider store={store}>
        <Navigation urls={urls} />
      </Provider>);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
