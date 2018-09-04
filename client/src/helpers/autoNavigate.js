import history from './history';

/**
 * Auto navigates user to appropriate page after signin
 *
 * @param {object} user Signed in user object
 * @param {object} location Browser location object
 */
const autoNavigate = (user, location) => {
  const { role } = user;
  if (location && !['/', '/signin', '/signup'].includes(location)) {
    history.push(location);
  } else if (role === 'customer') {
    history.push('/user-menu');
  } else if (role === 'superAdmin' || role === 'caterer') {
    history.push('/dashboard');
  }
};

export default autoNavigate;
