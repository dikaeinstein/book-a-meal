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
      timestamps: true,
      paranoid: true,
      hooks: {
        /* eslint no-param-reassign: 0 */
        afterCreate: async (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            created_at,
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
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
        afterUpdate: (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
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
      timestamps: true,
      paranoid: true,
      hooks: {
        /* eslint no-param-reassign: 0 */
        afterCreate: async (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            created_at,
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
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
        afterUpdate: (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
      },
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    define: {
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      hooks: {
        /* eslint no-param-reassign: 0 */
        afterCreate: async (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            created_at,
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
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
        afterUpdate: (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
      },
    },
  },
  heroku: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    define: {
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      hooks: {
        /* eslint no-param-reassign: 0 */
        afterCreate: async (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            created_at,
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
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
        afterUpdate: (instance) => {
          /* eslint camelcase: 0 */
          /* eslint no-unused-vars: 0 */
          const {
            updated_at,
            ...dataValues
          } = instance.dataValues;
          instance.dataValues = dataValues;
        },
      },
    },
  },
};
