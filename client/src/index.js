import React from 'react';
import { render } from 'react-dom';
import HotRoot from './components/Root';
import configureStore from './store/configureStore';
import { getUser } from './helpers/persistUser';
import history from './helpers/history';
import { userSignInSuccess } from './actions/userActions';
import autoNavigate from './helpers/autoNavigate';
import './static/index.scss';

const store = configureStore();

const user = getUser();
if (user) {
  store.dispatch(userSignInSuccess(user));
  autoNavigate(user, window.location.pathname);
} else {
  history.push('/');
}

render(<HotRoot store={store} />, document.getElementById('root'));
