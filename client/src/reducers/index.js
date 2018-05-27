import { combineReducers } from 'redux';
import urls from './urlReducer';
import menu from './menuReducer';

const rootReducer = combineReducers({ urls, menu });

export default rootReducer;
