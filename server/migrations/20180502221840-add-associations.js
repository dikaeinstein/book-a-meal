module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn(
      'orders',
      'user_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'CASCADE',
      },
    )
      .then(() => (
        queryInterface.addColumn(
          'orders',
          'meal_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'meals', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onDelete: 'CASCADE',
          },
        )
      ))
      /* eslint no-console: 0 */
      .catch(err => console.log(err))
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.removeColumn(
      'orders',
      'user_id',
    )
      .then(() => (
        queryInterface.removeColumn(
          'orders',
          'meal_id',
        )
      ))
      .catch(err => console.log(err))
  ),
};
