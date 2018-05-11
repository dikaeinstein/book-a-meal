module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.removeColumn('orders', 'amount')
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.addColumn('orders', 'amount', {
      type: Sequelize.DECIMAL,
    })
  ),
};
