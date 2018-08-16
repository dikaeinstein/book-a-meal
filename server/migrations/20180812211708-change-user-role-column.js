module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.TEXT,
    });
    await queryInterface.sequelize
      .query('drop type enum_users_role;');

    return queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('customer', 'caterer', 'superAdmin'),
      allowNull: false,
    });
  },

  down: () => null,
};
