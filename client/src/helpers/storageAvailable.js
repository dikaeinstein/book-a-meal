/**
 * Checks if the browser supports the web storage API
 * An adaptation of snippet on MDN
 *
 * @param {string} type Storage type e.g localStorage or sessionStorage
 */
const storageAvailable = (type) => {
  const storage = window[type];
  try {
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return error instanceof DOMException && (
      // everything except Firefox
      error.code === 22 ||
      // Firefox
      error.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      error.name === 'QuotaExceededError' ||
      // Firefox
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
};

export default storageAvailable;
