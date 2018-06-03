import storageAvailable from './storageAvailable';

export const setUser = (user) => {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('bamCurrentUser', JSON.stringify(user));
  } else {
    throw Error('localStorage not available');
  }
};

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

/* eslint consistent-return: 0 */
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
