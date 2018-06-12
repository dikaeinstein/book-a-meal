const PORT = process.env.PORT || 8000;

const allConfig = {
  development: {
    API_BASE_URL: `http://localhost:${PORT}`,
  },
  production: {
    API_BASE_URL: 'https://dikaeinstein-book-a-meal.herokuapp.com',
  },
  test: {
    API_BASE_URL: `http://localhost:${PORT}`,
  },
};

const config = allConfig[process.env.NODE_ENV];

export default config;
