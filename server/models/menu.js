module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    underscoredAll: true,
  });

  Menu.associate = (models) => {
    // associations can be defined here
    Menu.belongsToMany(models.Meal, {
      through: 'meal_menus',
      foreignKey: 'menu_id',
    });
  };
  return Menu;
};
