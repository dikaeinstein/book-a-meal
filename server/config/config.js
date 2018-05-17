require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorAliases: Sequelize.Op,
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      hooks: {
        /* eslint no-param-reassign: 0 */
        beforeFind: (options = {}) => {
          options.attributes = options.attributes || {};
          options.attributes.exclude = options.attributes.exclude || [];
          options.attributes.exclude = [
            ...options.attributes.exclude,
            'created_at',
            'updated_at',
            'deleted_at',
          ];

          return options;
        },
      },
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorAliases: Sequelize.Op,
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      hooks: {
        /* eslint no-param-reassign: 0 */
        beforeFind: (options = {}) => {
          options.attributes = options.attributes || {};
          options.attributes.exclude = options.attributes.exclude || [];
          options.attributes.exclude = [
            ...options.attributes.exclude,
            'created_at',
            'updated_at',
            'deleted_at',
          ];

          return options;
        },
      },
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
