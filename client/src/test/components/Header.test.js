import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import configureStore from '../../store/configureStore';
import initialState from '../../reducers/initialState';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import setup from '../setup';

// Setup tests
setup();

const store = configureStore(initialState);

let wrapper;

describe('<Header />', () => {
  beforeAll(() => {
    /* eslint function-paren-newline: 0 */
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Header className="test" />
        </MemoryRouter>
      </Provider>);
  });
  it('should render a header element', () => {
    expect(wrapper.find('header').length).toEqual(1);
  });
  it('should render a Logo component', () => {
    expect(wrapper.find(Logo).length).toEqual(1);
  });
  it('should render a Navigation component', () => {
    expect(wrapper.find(Navigation).length).toEqual(1);
  });
});
