const initialState = {
  urls: [
    {
      id: 1,
      name: 'Sign in',
      link: 'signin',
    },
    {
      id: 2,
      name: 'Sign up',
      link: 'signup',
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
    data: [],
    error: null,
  },
  meals: {
    isFetching: false,
    isUpdating: false,
    isSaving: false,
    isDeleting: false,
    data: [],
    fetchError: null,
    saveError: null,
    deleteError: null,
    updateError: null,
  },
};

export default initialState;
