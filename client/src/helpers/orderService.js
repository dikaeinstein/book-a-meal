import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import setAuthorization from './setAuthorizationToken';

/**
 * Order service
 */
const orderService = {
  getUserOrderHistory: async (url) => {
    /* eslint consistent-return: 0 */
    try {
      const headers = setAuthorization();
      const response = await axios.get(url, { headers });
      return response.data.orders;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  makeOrder: async (url, data) => {
    try {
      const headers = setAuthorization();
      const response = await axios.post(url, data, { headers });
      return response.data.order;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  deleteOrder: async (url) => {
    try {
      const headers = setAuthorization();
      const response = await axios.delete(url, { headers });
      return response.data.message;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  updateOrder: async (url, data) => {
    try {
      const headers = setAuthorization();
      const response = await axios.put(url, data, { headers });
      return response.data.order;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
};

export default orderService;
