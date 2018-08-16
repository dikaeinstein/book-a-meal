module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('meals', 'image_url', {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dikaeinstein/image/upload/c_scale,q_auto:low,w_1029/v1525566673/book-a-meal/avocado-cooked-delicious-262959.jpg',
      validate: {
        isURL: true,
      },
      field: 'image_url',
    })
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('meals', 'image_url', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
      field: 'image_url',
    })
  ),
};
