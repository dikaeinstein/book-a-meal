import storageAvailable from './storageAvailable';
/* eslint consistent-return: 0 */

/**
 * Save user object to localStorage
 *
 * @param {object} user Signed in user
 */
export const setUser = (user) => {
  if (storageAvailable('localStorage')) {
    try {
      const serializedUser = JSON.stringify(user);
      localStorage.setItem('bamCurrentUser', serializedUser);
    } catch (error) {
      return undefined;
    }
  } else {
    throw Error('localStorage not available');
  }
};

/**
 * Retrieve user object from localStorage
 */
export const getUser = () => {
  if (storageAvailable('localStorage')) {
    try {
      const currentUser = localStorage.getItem('bamCurrentUser');
      if (!currentUser) {
        return undefined;
      }
      return JSON.parse(currentUser);
    } catch (error) {
      return undefined;
    }
  }
  throw Error('localStorage not available');
};

/**
 * Remove user from localStorage
 */
export const removeUser = () => {
  if (storageAvailable('localStorage')) {
    try {
      localStorage.removeItem('bamCurrentUser');
    } catch (error) {
      return undefined;
    }
  } else {
    throw Error('localStorage not available');
  }
};
