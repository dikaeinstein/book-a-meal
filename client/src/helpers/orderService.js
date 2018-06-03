import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import { getUser } from './persistUser';

const orderService = {
  getUserOrderHistory: async (url) => {
    /* eslint consistent-return: 0 */
    try {
      const { token } = getUser();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      return response.data.orders;
    } catch (error) {
      axiosErrorWrapper(error);
    }
  },
};

export default orderService;
