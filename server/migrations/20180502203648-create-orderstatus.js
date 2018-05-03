module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('order_statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    })
  ),
  down: (queryInterface, Sequelize) => (
    queryInterface.dropTable('order_statuses')
  ),
};
