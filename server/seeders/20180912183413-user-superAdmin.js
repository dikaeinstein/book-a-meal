import { hashPassword } from '../lib/encrypt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword(process.env.password);
    return queryInterface.bulkInsert('users', [{
      name: process.env.name,
      email: process.env.email,
      password: hashedPassword,
      role: 'superAdmin',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
