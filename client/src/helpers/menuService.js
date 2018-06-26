import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import setAuthorizationToken from './setAuthorizationToken';

/**
 * Menu service object
 *
 * @export
 */
const menuService = {
  /**
   * Get up by making post using axios
   * @async
   *
   * @param {string} url
   *
   * @return {Promise<menu>}
   */
  getMenu: async (url) => {
    /* eslint consistent-return: 0 */
    try {
      const response = await axios.get(url);
      return response.data.menu;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },

  /**
   * Set up by making post using axios
   * @async
   *
   * @param {string} url
   * @param {object} values
   *
   * @return {Promise<menu>}
   */
  setMenu: async (url, values) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.post(url, values, { headers });
      return response.data.menu;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
};

export default menuService;
