const allConfig = {
  development: {
    API_BASE_URL: 'http://localhost:8000',
  },
  production: {
    API_BASE_URL: 'https://dikaeinstein-book-a-meal.herokuapp.com',
  },
};

const config = allConfig[process.env.NODE_ENV];

export default config;
