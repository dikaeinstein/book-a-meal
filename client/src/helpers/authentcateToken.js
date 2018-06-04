import axios from 'axios';
import config from '../config';
import axiosErrorWrapper from './axiosErrorWrapper';

/* eslint consistent-return: 0 */
const authenticateToken = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios
      .get(`${config.API_BASE_URL}/api/v1/auth`, { headers });
    if (response.status === 204) {
      return true;
    }
  } catch (error) {
    axiosErrorWrapper(error);
  }
};

export default authenticateToken;
