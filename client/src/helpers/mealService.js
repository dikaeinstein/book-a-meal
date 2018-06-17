import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import setAuthorization from './setAuthorizationToken';

const mealService = {
  /* eslint consistent-return: 0 */
  addMeal: async (url, meal) => {
    try {
      const headers = setAuthorization();
      const response = await axios.post(url, meal, { headers });
      return response.data.meal;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  getMeals: async (url) => {
    try {
      const headers = setAuthorization();
      const response = await axios.get(url, { headers });
      return response.data.meals;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  updateMeal: async (url, meal) => {
    try {
      const headers = setAuthorization();
      const response = await axios.put(url, meal, { headers });
      return response.data.meal;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
  deleteMeal: async (url) => {
    try {
      const headers = setAuthorization();
      const response = await axios.delete(url, { headers });
      return response.data.message;
    } catch (error) {
      throw axiosErrorWrapper(error);
    }
  },
};

export default mealService;
