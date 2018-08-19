const initialState = {
  urls: [
    {
      id: 1,
      name: 'Signin',
      link: 'signin',
    },
    {
      id: 2,
      name: 'Signout',
      link: 'signout',
    },
  ],
  menus: {
    isFetching: false,
    data: {
      menu: {
        name: 'Menu for today',
        meals: [],
      },
      menus: [],
    },
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
    isDeleting: false,
    data: {
      userOrders: [],
      checkedOutOrder: {},
    },
    fetchError: null,
    saveError: null,
    updateError: null,
    deleteError: null,
  },
  meals: {
    isFetching: false,
    isUpdating: false,
    isSaving: false,
    data: [],
    fetchError: null,
    saveError: null,
    updateError: null,
  },
  dashboard: {
    isFetchingTotalOrders: false,
    isFetchingTotalSales: false,
    isUpdating: false,
    isDeleting: false,
    fetchTotalOrdersError: null,
    fetchTotalSalesError: null,
    isFetchingAllOrders: false,
    fetchAllOrdersError: null,
    deleteOrderError: null,
    updateOrderError: null,
    totalAmount: 0,
    totalOrders: 0,
    allOrders: [],
  },
};

export default initialState;
