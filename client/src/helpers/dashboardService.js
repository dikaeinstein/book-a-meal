import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';

const dashboardService = {
  getTotalNumberOfOrders: async (url) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.get(url, { headers });
      return response.data.totalOrders;
    } catch (error) {
      throw error;
    }
  },
  getTotalAmount: async (url) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.get(url, { headers });
      return response.data.totalAmount;
    } catch (error) {
      throw error;
    }
  },
  getOrders: async (url) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.get(url, { headers });
      return response.data.orders;
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;
