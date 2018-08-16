module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('meals', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onDelete: 'CASCADE',
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('meals', 'user_id'),
};
