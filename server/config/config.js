require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'book-a-meal-dev',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorAliases: Sequelize.Op,
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'book-a-meal-test',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorAliases: Sequelize.Op,
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
  heroku: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};
