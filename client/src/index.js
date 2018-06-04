import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';
import Root from './routes';

import authenticateToken from './helpers/authentcateToken';
import { getUser } from './helpers/persistUser';
import { autoNavigate, userSignInSuccess } from './actions/userActions';
import './index.css';

const store = configureStore(initialState);

const user = getUser();

if (user) {
  const { token } = user;
  const authenticated = authenticateToken(token);
  if (authenticated) {
    store.dispatch(userSignInSuccess(user));
    autoNavigate(user, window.location);
  }
}

render(<Root store={store} />, document.getElementById('root'));
