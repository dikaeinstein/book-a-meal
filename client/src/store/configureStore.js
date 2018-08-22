import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import throttle from 'lodash.throttle';
import { loadState, saveState } from '../helpers/localStorage';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

/**
 * Return redux middleware
 */
const getMiddleware = () => {
  const logger = createLogger();

  const middleware =
    process.env.NODE_ENV !== 'production'
    && process.env.NODE_ENV !== 'test'
      ? applyMiddleware(thunk, logger)
      : applyMiddleware(thunk);

  return middleware;
};

/**
 * Configure the redux store
 *
 * @returns {object} Redux store
 */
const configureStore = () => {
  const persistedState = loadState();

  const state = persistedState
    ? { ...initialState, ...persistedState }
    : initialState;

  const store = createStore(
    rootReducer,
    state,
    compose(
      getMiddleware(),
      window.devToolsExtension ? window.devToolsExtension() : empty => empty,
    ),
  );

  // Throttle the saveState function to be called once every second
  store.subscribe(throttle(() => {
    saveState({ orders: store.getState().orders });
  }, 1000));

  return store;
};

export default configureStore;
