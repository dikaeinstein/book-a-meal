import { combineReducers } from 'redux';
import urls from './urlReducer';
import menus from './menuReducer';
import user from './userReducer';
import orders from './orderReducer';
import meals from './mealReducer';
import dashboard from './dashboardReducer';

const rootReducer = combineReducers({
  urls, menus, user, orders, meals, dashboard,
});

export default rootReducer;
