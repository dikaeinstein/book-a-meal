import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_ERROR,
  SETUP_MENU_ERROR,
  SETUP_MENU_REQUEST,
  SETUP_MENU_SUCCESS,
} from '../constants/menuActionTypes';
import initialState from '../reducers/initialState';

const menuReducer = (state = initialState.menus, action) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_MENU_ERROR:
      return { ...state, isFetching: false, fetchError: action.payload.error };
    case FETCH_MENU_SUCCESS: {
      const menu = action.payload.menu;
      return {
        ...state,
        isFetching: false,
        isSet: true,
        data: {
          ...state.data,
          menu,
        },
      };
    }
    case SETUP_MENU_ERROR:
      return { ...state, isSaving: false, saveError: action.payload.error };
    case SETUP_MENU_REQUEST:
      return { ...state, isSaving: true };
    case SETUP_MENU_SUCCESS:
      return {
        ...state,
        isSaving: false,
        isSet: true,
        data: action.payload.menu,
      };
    default:
      return state;
  }
};

export default menuReducer;
