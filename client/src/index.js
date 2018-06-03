import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './reducers/initialState';
import Root from './routes';
import { getUser } from './helpers/persistUser';
import { USER_SIGN_IN_SUCCESS } from './constants/actionTypes';
import './index.css';

const store = configureStore(initialState);

// const user = getUser();

// if(user) {
//   store.dispatch({ type: USER_SIGN_IN_SUCCESS, payload: { user } });
// }

render(<Root store={store} />, document.getElementById('root'));
