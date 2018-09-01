import axios from 'axios';
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
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  makeOrder: async (url, data) => {
    try {
      const headers = setAuthorization();
      const response = await axios.post(url, data, { headers });
      return response.data.order;
    } catch (error) {
      throw error;
    }
  },
  deleteOrder: async (url) => {
    try {
      const headers = setAuthorization();
      const response = await axios.delete(url, { headers });
      return response.data.message;
    } catch (error) {
      throw error;
    }
  },
  updateOrder: async (url, data) => {
    try {
      const headers = setAuthorization();
      const response = await axios.put(url, data, { headers });
      return response.data.order;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
