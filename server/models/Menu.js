module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  });

  Menu.associate = (models) => {
    // associations can be defined here
    Menu.belongsToMany(models.Meal, {
      through: 'meal_menus',
      foreignKey: 'menu_id',
      as: 'meals',
    });
  };
  return Menu;
};
