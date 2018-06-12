import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';
import Root from './routes';

import authenticateToken from './helpers/authentcateToken';
import history from './helpers/history';
import { getUser } from './helpers/persistUser';
import { autoNavigate, userSignInSuccess, userSignInError } from './actions/userActions';
import './static/index.scss';

const store = configureStore(initialState);

const user = getUser();

if (user) {
  try {
    const { token } = user;
    const authenticated = authenticateToken(token);
    if (authenticated) {
      store.dispatch(userSignInSuccess(user));
      autoNavigate(user, window.location);
    }
  } catch (error) {
    store.dispatch(userSignInError(error));
    history.push('/signin');
  }
}

render(<Root store={store} />, document.getElementById('root'));
