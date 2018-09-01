import { combineReducers } from 'redux';
import urls from './urlReducer';
import menu from './menuReducer';
import user from './userReducer';
import orders from './orderReducer';
import meals from './mealReducer';
import dashboard from './dashboardReducer';
import pagination from './paginationReducer';

const rootReducer = combineReducers({
  urls, menu, user, orders, meals, dashboard, pagination,
});

export default rootReducer;
