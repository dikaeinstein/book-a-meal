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
};

// customerUrls: [
//   {
//     id: 1,
//     name: 'Menu',
//     link: 'user-menu',
//   },
//   {
//     id: 2,
//     name: 'Orders',
//     link: 'user-orderhistory',
//   },
//   {
//     id: 3,
//     name: 'Dikaeinstein',
//     link: 'user-details',
//   },
//   {
//     id: 4,
//     name: 'Logout',
//     link: 'signout',
//   },
// ],
// adminUrls: [
//   {
//     id: 1,
//     name: 'Dashboard',
//     link: 'caterer-dashboard',
//   },
//   {
//     id: 2,
//     name: 'Meals',
//     link: 'meals',
//   },
//   {
//     id: 3,
//     name: 'Menus',
//     link: 'menus',
//   },
//   {
//     id: 4,
//     name: 'Caterer',
//     link: 'user-details',
//   },
//   {
//     id: 5,
//     name: 'Logout',
//     link: 'signout',
//   },
// ],

export default initialState;
