module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url',
    },
  }, {
    underscored: true,
    underscoredAll: true,
  });

  Meal.associate = (models) => {
    // associations can be defined here
    Meal.hasMany(models.Order, {
      foreignKey: 'meal_id',
      onDelete: 'CASCADE',
    });
    Meal.belongsToMany(models.Menu, {
      through: 'meal_menus',
      foreignKey: 'meal_id',
    });
  };
  return Meal;
};
