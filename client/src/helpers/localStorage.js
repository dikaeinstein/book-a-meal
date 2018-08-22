import storageAvailable from './storageAvailable';
/* eslint consistent-return: 0 */

/**
 * Load state from localStorage
 */
export const loadState = () => {
  if (storageAvailable('localStorage')) {
    try {
      const serializedState = localStorage.getItem('bamState');
      if (!serializedState) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  } else {
    throw Error('localStorage not available');
  }
};

/**
 * Save state to localStorage
 *
 * @param {object} state Application state
 */
export const saveState = (state) => {
  if (storageAvailable('localStorage')) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('bamState', serializedState);
    } catch (error) {
      return undefined;
    }
  } else {
    throw Error('localStorage not available');
  }
};
