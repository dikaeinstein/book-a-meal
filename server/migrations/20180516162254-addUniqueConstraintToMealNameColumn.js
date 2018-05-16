module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addConstraint('meals', ['name'], {
      type: 'unique',
    })
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.removeConstraint('meals', 'meals_name_uk')
  ),
};
