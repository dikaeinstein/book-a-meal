import axios from 'axios';
import { setUser } from './persistUser';

const userService = {
  /* eslint consistent-return: 0 */
  signIn: async (url, data) => {
    try {
      const response = await axios.post(url, data);
      const user = { ...response.data.user };
      user.token = response.data.token;
      setUser(user);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },
  signUp: async (url, data) => {
    try {
      const response = await axios.post(url, data);
      const user = { ...response.data.user };
      user.token = response.data.token;
      setUser(user);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
