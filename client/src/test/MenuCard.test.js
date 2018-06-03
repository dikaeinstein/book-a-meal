import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import mockAxios from 'axios';
import MenuCard from '../components/MenuCard';
import configureStore from '../store/configureStore';
import initialState from '../reducers/initialState';
import setup from './setup';

// Setup tests
setup();

const meals = [
  {
    id: 1,
    name: 'Spaghetti with meat balls',
    description: 'Some dummy description',
    imageUrl: 'https://mydummyimgurl.com',
    price: '2000',
  },
  {
    id: 2,
    name: 'Efo riro and cow head',
    description: 'Some dummy description',
    imageUrl: 'https://mydummyimgurl.com',
    price: '2000',
  },
];

let shallowWrapper;

const store = configureStore(initialState);

describe('<MenuCard />', () => {
  beforeAll(() => {
    /* eslint function-paren-newline: 0 */
    shallowWrapper = shallow(
      <Provider store={store}>
        <MenuCard link="/test" />
      </Provider>);
  });
  it('should render a MenuCard component', () => {
    expect(shallowWrapper.find(MenuCard).length).toEqual(1);
  });
  it('should render with correct props', () => {
    expect(shallowWrapper.props().link).toEqual('/test');
  });
  it('should fetch menu', async () => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { menu: { meals } },
      }));
    const fakeComponentDidMount = jest
      .spyOn(MenuCard.prototype, 'componentDidMount');
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MenuCard link="/test" />
        </MemoryRouter>
      </Provider>);
    expect(fakeComponentDidMount).toHaveBeenCalled();
  });
});
