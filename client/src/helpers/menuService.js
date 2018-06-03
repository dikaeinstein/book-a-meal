import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';

const menuService = {
  getMenu: async (url) => {
    /* eslint consistent-return: 0 */
    try {
      const response = await axios.get(url);
      return response.data.menu;
    } catch (error) {
      axiosErrorWrapper(error);
    }
  },
};

export default menuService;
