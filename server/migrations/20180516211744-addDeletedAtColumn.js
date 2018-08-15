module.exports = {
  up: (queryInterface, Sequelize) => {
    const meals = queryInterface.addColumn('meals', 'deleted_at', {
      type: Sequelize.DATE,
      field: 'deleted_at',
    });
    const menus = queryInterface.addColumn('menus', 'deleted_at', {
      type: Sequelize.DATE,
      field: 'deleted_at',
    });
    const orders = queryInterface.addColumn('orders', 'deleted_at', {
      type: Sequelize.DATE,
      field: 'deleted_at',
    });
    const users = queryInterface.addColumn('users', 'deleted_at', {
      type: Sequelize.DATE,
      field: 'deleted_at',
    });
    const mealMenus = queryInterface.addColumn('meal_menus', 'deleted_at', {
      type: Sequelize.DATE,
      field: 'deleted_at',
    });

    return Promise.all([meals, menus, orders, users, mealMenus]);
  },

  down: (queryInterface, Sequelize) => {
    const meals = queryInterface.removeColumn('meals', 'deleted_at');
    const menus = queryInterface.removeColumn('menus', 'deleted_at');
    const orders = queryInterface.removeColumn('orders', 'deleted_at');
    const users = queryInterface.removeColumn('users', 'deleted_at');
    const mealMenus = queryInterface.removeColumn('meal_menus', 'deleted_at');

    return Promise.all([meals, menus, orders, users, mealMenus]);
  },
};
