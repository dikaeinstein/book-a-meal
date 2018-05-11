module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn(
      'orders', 'expired',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    )
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.removeColumn('orders', 'expired')
  ),
};
