import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './store/configureStore';
import { getUser } from './helpers/persistUser';
import history from './helpers/history';
import { autoNavigate, userSignInSuccess }
  from './actions/userActions';
import './static/index.scss';

const store = configureStore();

const user = getUser();
if (user) {
  store.dispatch(userSignInSuccess(user));
  autoNavigate(user, window.location.pathname);
} else {
  history.push('/');
}

render(<Root store={store} />, document.getElementById('root'));
