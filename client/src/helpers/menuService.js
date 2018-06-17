import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import setAuthorizationToken from './setAuthorizationToken';

const menuService = {
  getMenu: async (url) => {
    /* eslint consistent-return: 0 */
    try {
      const response = await axios.get(url);
      return response.data.menu;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  setMenu: async (url) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.post(url, headers);
      return response.data.menu;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
};

export default menuService;
