import { combineReducers } from 'redux';
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_ERROR,
  SETUP_MENU_ERROR,
  SETUP_MENU_REQUEST,
  SETUP_MENU_SUCCESS,
  UPDATE_MENU_ERROR,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_SUCCESS,

} from '../constants/menuActionTypes';
import initialState from '../reducers/initialState';


const isFetching = (state = initialState.menu.isFetching, action) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return true;
    case FETCH_MENU_ERROR:
    case FETCH_MENU_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isSaving = (state = initialState.menu.isSaving, action) => {
  switch (action.type) {
    case SETUP_MENU_REQUEST:
      return true;
    case SETUP_MENU_ERROR:
    case SETUP_MENU_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isUpdating = (state = initialState.menu.isUpdating, action) => {
  switch (action.type) {
    case UPDATE_MENU_REQUEST:
      return true;
    case UPDATE_MENU_ERROR:
    case UPDATE_MENU_SUCCESS:
      return false;
    default:
      return state;
  }
};

const saveError = (state = initialState.menu.saveError, action) => {
  switch (action.type) {
    case SETUP_MENU_ERROR:
      return action.message;
    default:
      return state;
  }
};

const updateError = (state = initialState.menu.updateError, action) => {
  switch (action.type) {
    case UPDATE_MENU_ERROR:
      return action.message;
    default:
      return state;
  }
};

const fetchError = (state = initialState.menu.fetchError, action) => {
  switch (action.type) {
    case FETCH_MENU_ERROR:
      return action.message;
    case SETUP_MENU_SUCCESS:
      return initialState.menu.fetchError;
    default:
      return state;
  }
};

const isSet = (state = initialState.menu.isSet, action) => {
  switch (action.type) {
    case SETUP_MENU_SUCCESS:
    case FETCH_MENU_SUCCESS:
    case UPDATE_MENU_SUCCESS:
      return true;
    default:
      return state;
  }
};

const byId = (state = initialState.menu.byId, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
    case SETUP_MENU_SUCCESS:
    case UPDATE_MENU_SUCCESS: {
      return action.response.entities.menu;
    }
    default:
      return state;
  }
};

const menuId = (state = initialState.menu.menuId, action) => {
  switch (action.type) {
    case SETUP_MENU_SUCCESS:
    case FETCH_MENU_SUCCESS:
    case UPDATE_MENU_SUCCESS:
      return action.response.result;
    default:
      return state;
  }
};

const menuReducer = combineReducers({
  isFetching,
  isUpdating,
  isSaving,
  saveError,
  updateError,
  fetchError,
  isSet,
  byId,
  menuId,
});

export const getMenu = state =>
  state.byId[state.menuId] || { name: '', meals: [] };

export default menuReducer;
