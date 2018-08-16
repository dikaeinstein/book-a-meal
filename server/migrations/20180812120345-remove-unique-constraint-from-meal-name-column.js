module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.removeConstraint('meals', 'meals_name_uk')
  ),

  down: () => null,
};
