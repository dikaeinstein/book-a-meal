import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import setAuthorization from './setAuthorization';

const orderService = {
  getUserOrderHistory: async (url) => {
    /* eslint consistent-return: 0 */
    try {
      const headers = setAuthorization();
      const response = await axios.get(url, { headers });
      return response.data.orders;
    } catch (error) {
      axiosErrorWrapper(error);
    }
  },
};

export default orderService;
