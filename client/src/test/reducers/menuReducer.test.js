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

} from '../../constants/menuActionTypes';
import initialState from '../../reducers/initialState';
import reducer, { getMenu } from '../../reducers/menuReducer';

describe('menu reducer', () => {
  const response = {
    entities: {
      menu: {
        1: {
          id: 1,
          name: 'test menu for today',
          meals: [
            { id: 1, name: 'test meals' },
            { id: 2, name: 'test meals2' },
          ],
        },
      },
    },
    result: 1,
  };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.menu);
  });
  it('should handle FETCH_MENU_REQUEST', () => {
    expect(reducer(initialState.menu, { type: FETCH_MENU_REQUEST }))
      .toEqual({ ...initialState.menu, isFetching: true });
  });
  it('should handle SETUP_MENU_REQUEST', () => {
    expect(reducer(initialState.menu, { type: SETUP_MENU_REQUEST }))
      .toEqual({ ...initialState.menu, isSaving: true });
  });
  it('should handle UPDATE_MENU_REQUEST', () => {
    expect(reducer(initialState.menu, { type: UPDATE_MENU_REQUEST }))
      .toEqual({ ...initialState.menu, isUpdating: true });
  });
  it('should handle FETCH_MENU_SUCCESS', () => {
    expect(reducer(initialState.menu, {
      type: FETCH_MENU_SUCCESS,
      response,
    })).toEqual({
      ...initialState.menu,
      isSet: true,
      byId: response.entities.menu,
      menuId: 1,
    });
  });
  it('should handle SETUP_MENU_SUCCESS', () => {
    expect(reducer(initialState.menu, {
      type: SETUP_MENU_SUCCESS,
      response,
    })).toEqual({
      ...initialState.menu,
      isSet: true,
      byId: response.entities.menu,
      menuId: 1,
    });
  });
  it('should handle UPDATE_MENU_SUCCESS', () => {
    expect(reducer(initialState.menu, {
      type: UPDATE_MENU_SUCCESS,
      response,
    })).toEqual({
      ...initialState.menu,
      isSet: true,
      byId: response.entities.menu,
      menuId: 1,
    });
  });
  it('should handle FETCH_MENU_ERROR', () => {
    expect(reducer(initialState.menu, {
      type: FETCH_MENU_ERROR,
      message: 'Error fetching menu',
    })).toEqual({
      ...initialState.menu,
      fetchError: 'Error fetching menu',
    });
  });
  it('should handle SETUP_MENU_ERROR', () => {
    expect(reducer(initialState.menu, {
      type: SETUP_MENU_ERROR,
      message: 'Error saving menu',
    })).toEqual({
      ...initialState.menu,
      saveError: 'Error saving menu',
    });
  });
  it('should handle UPDATE_MENU_ERROR', () => {
    expect(reducer(initialState.menu, {
      type: UPDATE_MENU_ERROR,
      message: 'Error updating menu',
    })).toEqual({
      ...initialState.menu,
      updateError: 'Error updating menu',
    });
  });
  it('return menu when "getMenu" is called', () => {
    const state = {
      ...initialState.menu,
      byId: response.entities.menu,
      menuId: response.result,
    };
    expect(getMenu(state)).toEqual(response.entities.menu['1']);
    expect(getMenu(initialState.menu)).toEqual({ name: '', meals: [] });
  });
});
