import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';

const mealService = {
  /* eslint consistent-return: 0 */
  addMeal: async (url, meal) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.post(url, meal, { headers });
      return response.data.meal;
    } catch (error) {
      throw error;
    }
  },
  getMeals: async (url) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.get(url, { headers });
      return response.data.meals;
    } catch (error) {
      throw error;
    }
  },
  updateMeal: async (url, meal) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.put(url, meal, { headers });
      return response.data.meal;
    } catch (error) {
      throw error;
    }
  },
  deleteMeal: async (url) => {
    try {
      const headers = setAuthorizationToken();
      const response = await axios.delete(url, { headers });
      return response.data.message;
    } catch (error) {
      throw error;
    }
  },
};

export default mealService;
