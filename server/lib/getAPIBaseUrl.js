/**
 * Get API base url
 *
 * @returns {string} API base url
 */
const getAPIBaseUrl = () => {
  const PORT = process.env.PORT || 8000;
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://dikaeinstein-book-a-meal.herokuapp.com'
    : `http://localhost:${PORT}`;

  return API_BASE_URL;
};

export default getAPIBaseUrl;
