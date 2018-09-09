import reducer, {
  SET_CATERER_DASHBOARD_ORDERS_PAGINATION,
  SET_CATERER_MEALS_PAGINATION,
  SET_MENU_PAGINATION,
  SET_MEALS_PAGINATION,
  SET_DASHBOARD_ORDERS_PAGINATION,
  SET_ORDERS_PAGINATION,
} from '../../reducers/paginationReducer';
import initialState from '../../reducers/initialState';


describe('pagination reducer', () => {
  const links = [
    { rel: 'next', href: 'http://testurl/current' },
    { rel: 'previous', href: 'http://testurl/previous' },
    { rel: 'self', href: 'http://testurl/self' },
  ];
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.pagination);
  });
  it('should handle SET_ORDERS_PAGINATION', () => {
    expect(reducer(initialState.pagination, {
      type: SET_ORDERS_PAGINATION,
      links,
    })).toEqual({
      ...initialState.pagination,
      orders: {
        nextPage: links[0],
        previousPage: links[1],
        currentPage: links[2],
      },
    });
  });
  it('should handle SET_DASHBOARD_ORDERS_PAGINATION', () => {
    expect(reducer(initialState.pagination, {
      type: SET_DASHBOARD_ORDERS_PAGINATION,
      links,
    })).toEqual({
      ...initialState.pagination,
      dashboard: {
        ...initialState.pagination.dashboard,
        superAdmin: {
          nextPage: links[0],
          previousPage: links[1],
          currentPage: links[2],
        },
      },
    });
  });
  it('should handle SET_CATERER_DASHBOARD_ORDERS_PAGINATION', () => {
    expect(reducer(initialState.pagination, {
      type: SET_CATERER_DASHBOARD_ORDERS_PAGINATION,
      links,
    })).toEqual({
      ...initialState.pagination,
      dashboard: {
        ...initialState.pagination.dashboard,
        caterer: {
          nextPage: links[0],
          previousPage: links[1],
          currentPage: links[2],
        },
      },
    });
  });
  it('should handle SET_MEALS_PAGINATION', () => {
    expect(reducer(initialState.pagination, {
      type: SET_MEALS_PAGINATION,
      links,
    })).toEqual({
      ...initialState.pagination,
      meals: {
        ...initialState.pagination.meals,
        superAdmin: {
          nextPage: links[0],
          previousPage: links[1],
          currentPage: links[2],
        },
      },
    });
  });
  it('should handle SET_CATERER_MEALS_PAGINATION', () => {
    expect(reducer(initialState.pagination, {
      type: SET_CATERER_MEALS_PAGINATION,
      links,
    })).toEqual({
      ...initialState.pagination,
      meals: {
        ...initialState.pagination.meals,
        caterer: {
          nextPage: links[0],
          previousPage: links[1],
          currentPage: links[2],
        },
      },
    });
  });
  it('should handle SET_MENU_PAGINATION', () => {
    expect(reducer(initialState.pagination, {
      type: SET_MENU_PAGINATION,
      links,
    })).toEqual({
      ...initialState.pagination,
      menu: {
        ...initialState.pagination.menu,
        nextPage: links[0],
        previousPage: links[1],
        currentPage: links[2],
      },
    });
  });
});
