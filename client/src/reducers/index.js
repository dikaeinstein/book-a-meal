import { combineReducers } from 'redux';
import urls from './urlReducer';
import menu from './menuReducer';
import user from './userReducer';
import orders from './orderReducer';

const rootReducer = combineReducers({
  urls, menu, user, orders,
});

export default rootReducer;
