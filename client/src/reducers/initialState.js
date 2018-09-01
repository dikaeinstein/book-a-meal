import config from '../config';

const initialState = {
  urls: [
    {
      id: 1,
      name: 'Sign In',
      link: 'signin',
    },
    {
      id: 2,
      name: 'Sign Up',
      link: 'signup',
    },
  ],
  menu: {
    isFetching: false,
    byId: {},
    menuId: 0,
    isSet: false,
    isSaving: false,
    fetchError: null,
    saveError: null,
    updateError: null,
    isUpdating: false,
  },
  user: {
    isSubmitting: false,
    loggedIn: false,
    data: {
      id: null,
      name: '',
      email: '',
      role: '',
    },
    error: null,
  },
  orders: {
    isFetching: false,
    isSaving: false,
    isUpdating: false,
    byId: {},
    allIds: [],
    checkedOutOrder: {},
    fetchError: null,
    saveError: null,
    updateError: null,
  },
  meals: {
    isFetching: false,
    isUpdating: false,
    isSaving: false,
    isDeleting: false,
    byId: {},
    allIds: [],
    fetchError: null,
    saveError: null,
    updateError: null,
    deleteError: null,
  },
  dashboard: {
    isFetchingTotalOrders: false,
    isFetchingTotalAmount: false,
    isUpdating: false,
    fetchTotalOrdersError: null,
    fetchTotalAmountError: null,
    isFetchingAllOrders: false,
    fetchAllOrdersError: null,
    updateOrderError: null,
    totalAmount: 0,
    totalOrders: 0,
    byId: {},
    allIds: [],
  },
  pagination: {
    meals: {
      superAdmin: {
        nextPage: '',
        previousPage: '',
        currentPage: {
          rel: 'self',
          href: `${config.API_BASE_URL}/api/v1/meals?limit=12`,
        },
      },
      caterer: {
        nextPage: '',
        previousPage: '',
        currentPage: {
          rel: 'self',
          href: `${config.API_BASE_URL}/api/v1/meals/caterers?limit=12`,
        },
      },
    },
    orders: {
      nextPage: '',
      previousPage: '',
      currentPage: {
        rel: 'self',
        href: `${config.API_BASE_URL}/api/v1/orders/users?limit=10`,
      },
    },
    dashboard: {
      superAdmin: {
        nextPage: '',
        previousPage: '',
        currentPage: {
          rel: 'self',
          href: `${config.API_BASE_URL}/api/v1/orders?limit=10`,
        },
      },
      caterer: {
        nextPage: '',
        previousPage: '',
        currentPage: {
          rel: 'self',
          href: `${config.API_BASE_URL}/api/v1/orders/caterers?limit=10`,
        },
      },
    },
    menu: {
      nextPage: '',
      previousPage: '',
      currentPage: {
        rel: 'self',
        href: `${config.API_BASE_URL}/api/v1/menu/?limit=12`,
      },
    },
  },
};

export default initialState;
