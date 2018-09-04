import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import ReactModal from 'react-modal';
import { Root } from '../../components/Root';

describe('<Root />', () => {
  let store;
  beforeAll(() => {
    const mockStore = configureStore();
    store = mockStore({ user: { loggedIn: true } });
  });
  it('should redirect to homepage when "/signout route is matched', () => {
    const history = createMemoryHistory({
      initialEntries: ['/signout'], // The initial URLs in the history stack
    });
    const wrapper = shallow(<Root store={store} history={history} />);
    expect(wrapper.find(Route).get(3).props.render()).toBeDefined();
  });
  it('should render Root', () => {
    ReactModal.setAppElement(document.createElement('div'));
    const tree = shallow(<Root store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
