import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

/* eslint no-param-reassign: 0 */
/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */
const hooks = {
  afterCreate: async (instance) => {
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
    const {
      updated_at,
      ...dataValues
    } = instance.dataValues;
    instance.dataValues = dataValues;
  },
};

const define = {
  underscored: true,
  underscoredAll: true,
  timestamps: true,
  paranoid: true,
  hooks,
};

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    define,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    define,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    ssl: true,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    define,
  },
  heroku: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    logging: false,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    define,
  },
  e2e: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_E2E,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    define,
  },
};

export default config;
