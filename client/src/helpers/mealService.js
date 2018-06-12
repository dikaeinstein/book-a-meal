import axios from 'axios';
import axiosErrorWrapper from './axiosErrorWrapper';
import setAuthorization from './setAuthorization';

const mealService = {
  /* eslint consistent-return: 0 */
  addMeal: async (url, meal) => {
    try {
      const headers = setAuthorization();
      const response = await axios.post(url, meal, { headers });
      return response.data.meal;
    } catch (error) {
      axiosErrorWrapper(error);
    }
  },
  getMeals: async (url) => {
    try {
      const headers = setAuthorization();
      const response = await axios.get(url, { headers });
      return response.data.meals;
    } catch (error) {
      axiosErrorWrapper(error);
    }
  },
};

export default mealService;
