const dotenv = require('dotenv');
const encrypt = require('../lib/encrypt');

dotenv.config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Hash user password
      const hashedPassword = await encrypt
        .hashPassword(process.env.password);

      return queryInterface.bulkInsert('users', [{
        name: process.env.name,
        email: process.env.email,
        password: hashedPassword,
        role: 'superAdmin',
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
    } catch (err) {
      return err;
    }
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {
      where: {
        role: 'superAdmin',
        email: process.env.email,
      },
    }),
};
