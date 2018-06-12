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
  menu: {
    isFetching: false,
    data: {
      meals: [],
    },
    error: null,
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
    isSaving: false,
    data: [],
    error: null,
  },
};

export default initialState;
