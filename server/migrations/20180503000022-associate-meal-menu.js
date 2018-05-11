module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('meal_menus', {
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
      mealId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'meal_id',
      },
      menuId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'menu_id',
      },
    })
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.dropTable('meal_menus')
  ),
};
