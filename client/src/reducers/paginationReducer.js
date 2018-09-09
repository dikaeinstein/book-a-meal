import { combineReducers } from 'redux';
import initialState from './initialState';

export const SET_ORDERS_PAGINATION = 'SET_ORDERS_PAGINATION';
export const SET_MEALS_PAGINATION = 'SET_MEALS_PAGINATION';
export const SET_CATERER_MEALS_PAGINATION = 'SET_CATERER_MEALS_PAGINATION';
export const SET_CATERER_DASHBOARD_ORDERS_PAGINATION = 'SET_CATERER_DASHBOARD_ORDERS_PAGINATION';
export const SET_DASHBOARD_ORDERS_PAGINATION = 'SET_DASHBOARD_ORDERS_PAGINATION';
export const SET_MENU_PAGINATION = 'SET_MENU_PAGINATION';

const nextPage = (state, action) => {
  if (action.links) {
    const nextUrl =
      action.links.filter(link => link.rel === 'next')[0] || '';
    return nextUrl;
  }
  return state;
};

const currentPage = (state, action) => {
  if (action.links) {
    const currentUrl =
      action.links.filter(link => link.rel === 'self')[0] || '';
    return currentUrl;
  }
  return state;
};

const previousPage = (state, action) => {
  if (action.links) {
    const previousUrl =
      action.links.filter(link => link.rel === 'previous')[0] || '';
    return previousUrl;
  }
  return state;
};

const orders = (state = initialState.pagination.orders, action) => {
  switch (action.type) {
    case SET_ORDERS_PAGINATION:
      return {
        nextPage: nextPage(state.nextPage, action),
        previousPage: previousPage(state.previousPage, action),
        currentPage: currentPage(state.current, action),
      };
    default:
      return state;
  }
};

const linksReducer = (state, action) => {
  if (action.links) {
    return {
      nextPage: nextPage(state.nextPage, action),
      previousPage: previousPage(state.previousPage, action),
      currentPage: currentPage(state.currentPage, action),
    };
  }
  return state;
};

const meals = (state = initialState.pagination.meals, action) => {
  switch (action.type) {
    case SET_MEALS_PAGINATION:
      return {
        ...state,
        superAdmin: linksReducer(state.superAdmin, action),
      };
    case SET_CATERER_MEALS_PAGINATION:
      return {
        ...state,
        caterer: linksReducer(state.caterer, action),
      };
    default:
      return state;
  }
};

const dashboard = (state = initialState.pagination.dashboard, action) => {
  switch (action.type) {
    case SET_CATERER_DASHBOARD_ORDERS_PAGINATION:
      return {
        ...state,
        caterer: linksReducer(state.caterer, action),
      };
    case SET_DASHBOARD_ORDERS_PAGINATION:
      return {
        ...state,
        superAdmin: linksReducer(state.superAdmin, action),
      };
    default:
      return state;
  }
};

const menu = (state = initialState.pagination.menu, action) => {
  switch (action.type) {
    case SET_MENU_PAGINATION:
      return linksReducer(state, action);
    default:
      return state;
  }
};

const paginationReducer = combineReducers({
  meals, orders, dashboard, menu,
});

// Selectors
export const getNextPageUrl = state => state.nextPage.href;
export const getCurrentPageUrl = state => state.currentPage.href;
export const getPreviousPageUrl = state => state.previousPage.href;

export default paginationReducer;
