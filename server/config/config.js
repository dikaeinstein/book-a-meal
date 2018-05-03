require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'book-a-meal-dev',
    host: '127.0.0.1',
    port: 5432,
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
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    operatorAliases: Sequelize.Op,
    define: {
      underscored: true,
      underscoredAll: true,
    },
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
